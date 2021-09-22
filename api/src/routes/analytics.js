const { Router } = require("express");
const User = require("../models/user/user")
const Order = require("../models/order/order")
const router = Router();

const daysArray = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
const monthsArray = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const today = new Date();
const dayName = daysArray[today.getDay()];
const monthName = monthsArray[today.getMonth()];

router.get("/byUser/all", async(req, res, next) => {
    const userSessionID = req?.session?.passport?.user
    console.log(req.session)
    if (userSessionID) {
        const allOrders = await Order.find({owner: userSessionID})
        console.log(allOrders, "all orDERSAWS")
        const byStatus = {
            cantOrders: allOrders.length,
            totalOrders: 0,
            totalCreate: 0,
            totalProcessing: 0,
            totalComplete: 0,
            totalCancelled: 0,
            cantCreate: 0,
            cantProcessing: 0,
            cantComplete: 0,
            cantCancelled: 0,
        }

        for (var i=0; i<allOrders.length; i++) {
            byStatus.totalOrders += allOrders[i].total;
            if (allOrders[i].status === "Creada") {
                byStatus.totalCreate += allOrders[i].total;
                byStatus.cantCreate ++;
            } else if (allOrders[i].status === "Procesando") {
                byStatus.totalProcessing += allOrders[i].total;
                byStatus.cantProcessing ++;
            } else if (allOrders[i].status === "Completa") {
                byStatus.totalComplete += allOrders[i].total;
                byStatus.cantComplete ++;
            } else if (allOrders[i].status === "Cancelada") {
                byStatus.totalCancelled += allOrders[i].total;
                byStatus.cantCancelled ++;
            }
        }

        return res.status(200).json(byStatus)
    } else {
        return res.send("No hay usuario logeado.")
    }
});

router.get("/byUser/items", async(req, res, next) => {
    const userSessionID = req?.session?.passport?.user
    if (userSessionID) {
        const allOrders = await Order.find({owner: userSessionID}).populate({
            path: "items",
            populate: {
                path: "product"
            }
        });
        const allItems = [];
        for (var i=0; i<allOrders.length; i++) {
            for (var j=0; j<allOrders[i].items.length; j++) {
                allItems.push(allOrders[i].items[j])
            }
        }
        var byItem = {
            cantItems: 0,
            totalItems: 0,
        }
        console.log(`ALL ITEMS ${allItems}`)
        for (var h=0; h<allItems.length; h++) {
            byItem.cantItems += allItems[h].quantity;
            byItem.totalItems += allItems[h].subTotal;
            if (!byItem[`cant${allItems[h].product.name}`]) {
                byItem = {
                    ...byItem,
                    [`cant${allItems[h].product.name}`]: allItems[h].quantity
                }
            } else {
                byItem[`cant${allItems[h].product.name}`] += allItems[h].quantity;
            }
            if (!byItem[`total${allItems[h].product.name}`]) {
                byItem = {
                    ...byItem,
                    [`total${allItems[h].product.name}`]: allItems[h].subTotal, 
                }
            } else {
                byItem[`total${allItems[h].product.name}`] += allItems[h].subTotal;
            }
        }
        return res.status(200).json(byItem)
    } else {
        return res.send("No hay usuario logiado.")
    }
});

router.get("/byUser/months", async(req, res, next) => {
    const userSessionID = req?.session?.passport?.user
    const { monthStart, monthEnd } = req.body; //entre 0 y 11, donde 0 corresponde a Enero, 1 a Febrero y así sucesivamente.
    if (userSessionID) {
        const allOrders = await Order.find({owner: userSessionID}).populate({
            path: "items",
            populate: {
                path: "product"
            }
        });
        const monthsAnalytics = [];
        if (monthStart && monthEnd) {
            for (var i=0; i<allOrders.length; i++) {
                const orderDate = allOrders[i].createdAt.getMonth();
                if (orderDate >= monthStart && orderDate <= monthEnd) {
                    monthsAnalytics.push(allOrders[i]);
                }
            }
        } else if (monthStart && !monthEnd) {
            for (var i=0; i<allOrders.length; i++) {
                const orderDate = allOrders[i].createdAt.getMonth();
                if (orderDate === monthStart) {
                    monthsAnalytics.push(allOrders[i]);
                }
            }
        }
        var dataOrders = {
            cantOrders: monthsAnalytics.length,
            totalOrders: 0,
            totalCreate: 0,
            totalProcessing: 0,
            totalComplete: 0,
            totalCancelled: 0,
            cantCreate: 0,
            cantProcessing: 0,
            cantComplete: 0,
            cantCancelled: 0,
            cantItems: 0,
            totalItems: 0,
        }
        for (var i=0; i<monthsAnalytics.length; i++) {
            dataOrders.totalOrders += monthsAnalytics[i].total;
            if (monthsAnalytics[i].status === "Creada") {
                dataOrders.totalCreate += monthsAnalytics[i].total;
                dataOrders.cantCreate ++;
            } else if (monthsAnalytics[i].status === "Procesando") {
                dataOrders.totalProcessing += monthsAnalytics[i].total;
                dataOrders.cantProcessing ++;
            } else if (monthsAnalytics[i].status === "Completa") {
                dataOrders.totalComplete += monthsAnalytics[i].total;
                dataOrders.cantComplete ++;
            } else if (monthsAnalytics[i].status === "Cancelada") {
                dataOrders.totalCancelled += monthsAnalytics[i].total;
                dataOrders.cantCancelled ++;
            }
            const items = monthsAnalytics[i].items;
            for (var j=0; j<items.length; j++) {
                dataOrders.cantItems += items[j].quantity;
                dataOrders.totalItems += items[j].subTotal;
                if (!dataOrders[`cant${items[j].product.name}`]) {
                    dataOrders[`cant${items[j].product.name}`] = items[j].quantity;
                } else {
                    dataOrders[`cant${items[j].product.name}`] += items[j].quantity;
                }
                if (!dataOrders[`total${items[j].product.name}`]) {
                    dataOrders[`total${items[j].product.name}`] = items[j].subTotal;
                } else {
                    dataOrders[`total${items[j].product.name}`] += items[j].subTotal;
                }
            }
        }
        return res.status(200).json(dataOrders);
    } else {
        return res.send("No hay usuario logiado.")
    }
});

router.get("/forVendor/all", async(req, res, next) => {
    const userSessionID = req?.session?.passport?.user
    if (userSessionID) {
        const user = await User.findById(userSessionID).populate("petitionsAsVendor")
        const userAsVendor = user.petitionsAsVendor;
        const byStatus = {
            cantOrders: userAsVendor.length,
            totalOrders: 0,
            totalCreate: 0,
            totalProcessing: 0,
            totalComplete: 0,
            totalCancelled: 0,
            cantCreate: 0,
            cantProcessing: 0,
            cantComplete: 0,
            cantCancelled: 0,
        }

        for (var i=0; i<userAsVendor.length; i++) {
            byStatus.totalOrders += userAsVendor[i].total;
            if (userAsVendor[i].status === "Creada") {
                byStatus.totalCreate += userAsVendor[i].total;
                byStatus.cantCreate ++;
            } else if (userAsVendor[i].status === "Procesando") {
                byStatus.totalProcessing += userAsVendor[i].total;
                byStatus.cantProcessing ++;
            } else if (userAsVendor[i].status === "Completa") {
                byStatus.totalComplete += userAsVendor[i].total;
                byStatus.cantComplete ++;
            } else if (userAsVendor[i].status === "Cancelada") {
                byStatus.totalCancelled += userAsVendor[i].total;
                byStatus.cantCancelled ++;
            }
        }

        return res.status(200).json(byStatus)
    } else {
        return res.send("No hay usuario logeado.")
    }
});

router.get("/forVendor/items", async(req, res, next) => {
    const userSessionID = req?.session?.passport?.user
    if (userSessionID) {
        const user = await User.findById(userSessionID).populate({
            path: "petitionsAsVendor",
            populate: {
                path: "items",
                populate: {
                    path: "product"
                }
            }
        })
        const userAsVendor = user.petitionsAsVendor;
        const allItems = [];
        for (var i=0; i<userAsVendor.length; i++) {
            for (var j=0; j<userAsVendor[i].items.length; j++) {
                allItems.push(userAsVendor[i].items[j])
            }
        }
        var byItem = {
            cantItems: 0,
            totalItems: 0,
        }
        console.log(`ALL ITEMS ${allItems}`)
        for (var h=0; h<allItems.length; h++) {
            byItem.cantItems += allItems[h].quantity;
            byItem.totalItems += allItems[h].subTotal;
            if (!byItem[`cant${allItems[h].product.name}`]) {
                byItem = {
                    ...byItem,
                    [`cant${allItems[h].product.name}`]: allItems[h].quantity
                }
            } else {
                byItem[`cant${allItems[h].product.name}`] += allItems[h].quantity;
            }
            if (!byItem[`total${allItems[h].product.name}`]) {
                byItem = {
                    ...byItem,
                    [`total${allItems[h].product.name}`]: allItems[h].subTotal, 
                }
            } else {
                byItem[`total${allItems[h].product.name}`] += allItems[h].subTotal;
            }
        }
        return res.status(200).json(byItem)
    } else {
        return res.send("No hay usuario logiado.")
    }
});

router.get("/forVendor/months", async(req, res, next) => {
    const userSessionID = req?.session?.passport?.user
    const { monthStart, monthEnd } = req.body; //entre 0 y 11, donde 0 corresponde a Enero, 1 a Febrero y así sucesivamente.
    if (userSessionID) {
        const user = await User.findById(userSessionID).populate({
            path: "petitionsAsVendor",
            populate: {
                path: "items",
                populate: {
                    path: "product"
                }
            }
        })
        const userAsVendor = user.petitionsAsVendor;
        const monthsAnalytics = [];
        if (monthStart && monthEnd) {
            for (var i=0; i<userAsVendor.length; i++) {
                const orderDate = userAsVendor[i].createdAt.getMonth();
                if (orderDate >= monthStart && orderDate <= monthEnd) {
                    monthsAnalytics.push(userAsVendor[i]);
                }
            }
        } else if (monthStart && !monthEnd) {
            for (var i=0; i<userAsVendor.length; i++) {
                const orderDate = userAsVendor[i].createdAt.getMonth();
                if (orderDate === monthStart) {
                    monthsAnalytics.push(userAsVendor[i]);
                }
            }
        }
        var dataOrders = {
            cantOrders: monthsAnalytics.length,
            totalOrders: 0,
            totalCreate: 0,
            totalProcessing: 0,
            totalComplete: 0,
            totalCancelled: 0,
            cantCreate: 0,
            cantProcessing: 0,
            cantComplete: 0,
            cantCancelled: 0,
            cantItems: 0,
            totalItems: 0,
        }
        for (var i=0; i<monthsAnalytics.length; i++) {
            dataOrders.totalOrders += monthsAnalytics[i].total;
            if (monthsAnalytics[i].status === "Creada") {
                dataOrders.totalCreate += monthsAnalytics[i].total;
                dataOrders.cantCreate ++;
            } else if (monthsAnalytics[i].status === "Procesando") {
                dataOrders.totalProcessing += monthsAnalytics[i].total;
                dataOrders.cantProcessing ++;
            } else if (monthsAnalytics[i].status === "Completa") {
                dataOrders.totalComplete += monthsAnalytics[i].total;
                dataOrders.cantComplete ++;
            } else if (monthsAnalytics[i].status === "Cancelada") {
                dataOrders.totalCancelled += monthsAnalytics[i].total;
                dataOrders.cantCancelled ++;
            }
            const items = monthsAnalytics[i].items;
            for (var j=0; j<items.length; j++) {
                dataOrders.cantItems += items[j].quantity;
                dataOrders.totalItems += items[j].subTotal;
                if (!dataOrders[`cant${items[j].product.name}`]) {
                    dataOrders[`cant${items[j].product.name}`] = items[j].quantity;
                } else {
                    dataOrders[`cant${items[j].product.name}`] += items[j].quantity;
                }
                if (!dataOrders[`total${items[j].product.name}`]) {
                    dataOrders[`total${items[j].product.name}`] = items[j].subTotal;
                } else {
                    dataOrders[`total${items[j].product.name}`] += items[j].subTotal;
                }
            }
        }
        return res.status(200).json(dataOrders);
    } else {
        return res.send("No hay usuario logiado.")
    }
});

module.exports = router;