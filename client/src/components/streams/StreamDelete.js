import React from 'react';
import Modal from '../modal';
import history from '../../history';
import {showStream, deleteStream} from '../../actions';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'

class StreamDelete extends React.Component{
    componentDidMount(){
        this.props.showStream(this.props.match.params.id)
    }
    renderActions(){
        const id= this.props.match.params.id;
        return(
        <React.Fragment>
            <button onClick={()=> this.props.deleteStream(id)} className='ui button negative'> Delete </button>
            <Link to= '/' className='ui button'> Cancel </Link>
        </React.Fragment>
    );
    }
    renderContent(){
        if(!this.props.stream){
            return 'Are you sure?'
        }
        return `Are you sure you want to delete: ${this.props.stream.title}`
    }

    render(){
    return (
            <Modal 
                title='Delete Stream'
                content= {this.renderContent()}
                actions={this.renderActions()}
                onDismiss={()=> history.push('/')}
            />)
    }
}
const mapStateToProps= (state, ownProps) =>{
    return {stream: state.streams[ownProps.match.params.id]}
}
export default connect(mapStateToProps, {showStream, deleteStream})(StreamDelete);