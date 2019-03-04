import React from "react";
import { API, graphqlOperation }  from 'aws-amplify'; 
import { createMarket } from '../graphql/mutations';
import { Form, Button, Dialog, Input, Select, Notification } from 'element-react'
import  { UserContext }  from '../App';

class NewMarket extends React.Component {
  state = {
    name:"",
    tags: [ "Arts", "Web Dev", "Technology", "Crafts", "Entertainment" ],
    options: [],
    selectedTags: [],
    addMarketDialog: false  
  };

  handleAddMarket = async user => {
    try {
      this.setState({ addMarketDialog: false })
      const input = {
        name: this.state.name,
        tags:this.state.selectedTags,
        owner: user.username
      };
      const result = await API.graphql (
        graphqlOperation(createMarket, { input  })
      );
      console.log({ result })  
      console.info(`Created  Market: id ${ result.data.createMarket.id }`)
        this.setState({ name:'', selectedTags: [] })
    } catch(err){
      console.log("Error adding new  Market", err)
      Notification.error({
        title:"Error",
        message: `${err.message || "Error Adding Market"}`
      })
    }
  } 

  handleFilterTags = query => {
  const options = this.state.tags
  .map(tag => ({ value: tag,  label: tag }))
  .filter(tag => tag.label.toLowerCase().includes(query.toLowerCase()))
  this.setState({ options })
}
        
  render() {
    return (
      <UserContext.Consumer>
        {
          ({ user }) => ( <React.Fragment>
          <div className="market-header">
            <h1 className="market-title">
              Create Your Market Place
              <Button 
                type="text"
                icon="edit"
                className="market-title-button"
                onClick={() => this.setState({ addMarketDialog:true })}
                />
            </h1>
          </div>
          <Dialog
            title="Create New Market"
            visible={this.state.addMarketDialog}
            onCancel={() => this.setState({ addMarketDialog: false })}
            size="large"
            customClass="dialog"
          >
            <Dialog.Body>
              <Form labelPosition="top">
                <Form.Item>
                  <Input 
                    placeholder="Market Name"
                    trim={true}
                    onChange={name => this.setState({ name })}
                    value={this.state.name}
                  />
                </Form.Item>   
                <Form.Item label="Add Tags">
                  <Select 
                    multiple={true}
                    filterable={true}
                    placeholder="Maket Tags"
                    onChange={selectedTags => this.setState({ selectedTags })}
                    remoteMethod={this.handleFilterTags}
                    remote={true}>
                    {this.state.options.map(option => (
                      <Select.Option 
                        key={option.value}
                        label={option.label}
                        value={option.value}
                      />
                    ))}
                  </Select>
                </Form.Item>         
              </Form>
            </Dialog.Body>
            <Dialog.Footer onClick={() => this.setState({ addMarketDialog: false })}>
              <Button>
                Cancel
              </Button>
              <Button 
                type="primary"
                disabled={!this.state.name}
                onClick={() => this.handleAddMarket(user)}
                >
                Add
              </Button>
            </Dialog.Footer>
          </Dialog>
        </React.Fragment>
        )
      }
      </UserContext.Consumer> 
    )
  }
}

export default NewMarket;
