import React from 'react';
import axios from 'axios';

class SellerApproveItemPage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      note: '',
			message: {
				text: ''
			},
			timeout: undefined,
			status: 'good'
    }
		
		this.onApproveClick = this.onApproveClick.bind(this);
  }

  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({note}));
  }
	
	onApproveClick = (e) => {
		
		if (this.state.status !== 'good')
			return;
		
		this.setState({
			status: 'pending'
		})
		
		const ORDER_ID = this.props.match.params.orderid;
		const URL = `/process-pending-orders/approve/${ORDER_ID}`;
		const POST_DATA = {};
		
		axios
			.post(URL, POST_DATA)
			.then((response) => {
				
				clearTimeout(this.state.timeout);
				this.setState({
					message: {
						text: 'Success, redirecting...',
					}
				})
				
				setTimeout(() => {
					window.location = '/transactionhistory'
				}, 2000)
				
				
				
			})
			.catch((error) => {
				
				clearTimeout(this.state.timeout);
				this.setState({
					message: {
						text: error.response.data,
						state: 'good'
					}
				})
				
				setTimeout(() => {
					this.setState({
						message: {
							text: ''
						}
					})
				}, 2000)
				
			})
		
	}
	
	onRejectClick = (e) => {
		
		if (this.state.status !== 'good')
			return;
		
		this.setState({
			status: 'pending'
		})
		
		const NOTE = this.state.note.trim();
		if (!NOTE)
			return;
		
		const ORDER_ID = this.props.match.params.orderid;
		const URL = `/process-pending-orders/reject/${ORDER_ID}`;
		const POST_DATA = {
			note: NOTE
		};
		
		axios
			.post(URL, POST_DATA)
			.then((response) => {
				
				clearTimeout(this.state.timeout);
				this.setState({
					message: {
						text: 'Success, redirecting...'
					}
				})
				
				setTimeout(() => {
					window.location = '/transactionhistory'
				}, 2000)
				
				
			})
			.catch((error) => {
				
				clearTimeout(this.state.timeout)
				this.setState({
					message: {
						text: error.response.data,
						state: 'good'
					}
				})
				
				setTimeout(() => {
					this.setState({
						message: {
							text: ''
						}
					})
				}, 2000)
				
			})
		
	}

  render() {
		
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Approve or Disapprove Buyer</h1>
          </div>
        </div> 

          <div className="content-container">
            <div className="form">
							<div>
								{this.state.message.text}
							</div>
							<div >
								<button className="button" onClick={this.onApproveClick}>Approve</button>
							</div>
              <div >
                <textarea
                  placeholder="Add a note to explain your disapproval"
                  className="textarea"
                  value={this.state.note}
                  onChange={this.onNoteChange}
                >
                </textarea>
                
                <div>
                  <button className="button--secondary" onClick={this.onRejectClick}>Disapprove</button>
                </div>

              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default SellerApproveItemPage;