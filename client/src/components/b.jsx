{/* <div item lg={3} >
           
        <div className={classes.root2}>
         <div className={classes.leyend}>
             <h1 className={classes.h1}> Tiendas</h1>
             <Link className={classes.link} to="/store"><p>ver más</p></Link>
            </div>
                
            <div style={{ marginTop:"10px"}}>
             
            {
                filterStores()?.map(store => {
                    return(
                        <>
                        <Link to={`/storedetail/${store?._id}`}>
                        <div className={classes.divStore}>
                        <div  className={classes.storeImg}>

                        <section className={classes.infoDiv}>
                        <h4  className={classes.info}>{store?.name}</h4>
                        <p  className={classes.info}>{store?.description}</p>
                        <p  className={classes.info}
                            style={{marginTop:"10px", color:"yellow"}}
                        >{store?.city}</p>
                        </section>
                        </div> 
                        </div>
                        </Link>
                        <div>    
                        </div>
                        </>
                    )
                })
            }
            </div>
            </div>
          
               
            
                 </div> */}







            //      <div  className={classes.root} >
            //      <section className={classes.section}>
            //      <div className={classes.leyend}>
            //      <h1 className={classes.h1}>Basado en tu última visita</h1>
            //      <Link className={classes.link} to="/history"><p>ver más</p></Link>
            //      </div>
            //      <Grid 
            //                    container direction="row"
            //                justifyContent="center"
            //                alignItems="flex-start"
            //                className={classes.products}>  
           
            
                   
            //        {historyProducts?
            //    <Grid >         
            //          {
                       
            //            filterhistory()?.map((p,i )=>{
            //              return(
            //                <Fragment key={i}>     
            //                <Grid item lg={3}>
                         
            //                  <Card  
            //                      key={i}                  
            //                      name= {p?.name}
            //                      price={p?.price}
            //                      quantity={p?.quantity}
            //                      category={p?.category?.map((e, k) => {
            //                          const aux = categories.find(i => i._id === e)
            //                          return <p key={k}>{aux?.name}</p>
            //                      })}
            //                      image={p?.image }
            //                      id={p?.id}                
            //                      />
            //                 </Grid>
            //                 </Fragment>
            //              )           
            //          })}   
                   
                  
            //        </Grid>
            //        :
            //       <div style={{textAlign:"center"}}>
            //        <img src={NoHistory} style={{width:"50%",textAlign:"center"}}/>
            //        </div>
            //        }   
            //         </Grid>
                   
           
                 
            //        </section>
           
                   
                          
           
                    
                       
            //        </div>