import React, { Fragment } from 'react'
import configData from "../../config.json";
import ALLorderlistUI from './ALLorderlistUI'
var notification 
export default class Allorderlist extends React.Component {

    state = {
      isLoading: true,
      posts: [],
      newposts: [],
      error: null,
      flag: false,
      Printflag: false,
      idOrder: 0,
      update: false,
      refreshtime: ''
    };

   fetchPosts() {
   
     
    
  
    fetch(`${configData.SERVER_URL}/api/order/All/pending/order/${this.props.id}`)
    .then(response => response.json())
    .then(
      data =>
        this.setState({
          posts: data,
          isLoading: false,
          
        })
        )
        .catch(error => {
          console.log(error)
          this.setState({ error, isLoading: false })});
    }

   
    refetchPost(){
      const { posts} = this.state;
  
     
      fetch(`${configData.SERVER_URL}/api/order/All/pending/order/${this.props.id}`)
          .then(response => response.json())
          .then(
            data =>{
              
              

              if(data.length>posts.length){
                this.setState({posts: data,
                  isLoading: false,
                 })
               //s
  
               var options = {
                    body: `Received a new Order! OrderID:${data[0].Order_id} (${data[0].Type}) Customer Name: ${posts[0].Customer_Name}`,
                    icon: `${configData.SERVER_URL}/public/b983f0d2-2eab-4736-9435-99fc9b311785-american-1239081_1920.jpg`,
                    dir: "ltr"
                  };
                 notification = new Notification("Notification", options);
                 notification.onclick = function(event) {
                  event.preventDefault(); // prevent the browser from focusing the Notification's tab
                  window.open(`/updateorderlist`, '_blank');
                }
                console.log('new order')
            
                
              }
             
             
            }
          )
          .catch(error => this.setState({ error, isLoading: false }));
       
          //new order update
         
         
    }

    
  
    componentDidMount() {
      this.fetchPosts();
   
      this.interval = setInterval(() => this.refetchPost(), 5000);
  
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }
    //handle button click for show details
   
  

  
    render() {
      const { posts } = this.state;
      console.log(posts)
      return (
        <Fragment>
       
        
        <table className='servicesT'>
        
        <tbody>
          <tr>
          <th>Order Id</th>
          <th>Date</th>
          <th>Table number</th>
          <th>amount</th>
          <th>status</th>
          <th>Order By</th>
          <th></th>
          <th></th>
          </tr>
    </tbody>
    {posts.length>0?(<Fragment>{posts.map((orders,i) => (
            
            <ALLorderlistUI
              key={i}
              orders={orders}
              id={9}
              rid={5}
            />
          ))}</Fragment>):(<Fragment>
            <tbody>
        <tr>
          <td>None </td>
          <td>None</td>
          <td>None</td>
          <td>None</td>
          <td>None</td>
          <td>None</td>
        </tr>
        
        </tbody>
      
          </Fragment>)}
        
   
        </table>
      
  
          </Fragment>
      );
    }
  }