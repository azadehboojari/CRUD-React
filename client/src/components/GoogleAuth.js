import React from 'react';
import {connect} from 'react-redux';
import { signIn, signOut} from '../actions';


class GoogleAuth extends React.Component {

    componentDidMount(){
        // we use window to sya this is a variable GAPI that is 
        // available on windows scope inside our browser
        // without window browser will throw an error that GAPI is unknown
        // because loading this library will take som etime we need to give the function
        // a callback of when that process is complete
        window.gapi.load('client:auth2', ()=>{
            window.gapi.client.init({
                clientId: '484436129610-3pt8f02e3rqqvgtdu40gdbjtvds378lr.apps.googleusercontent.com',
                scope: 'email'
            }).then(()=>{
                this.auth=window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        })
    }
    // callback function
    onAuthChange= (isSignedIn) => {
        if (isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }

    onsignInClick = ()=>{
        this.auth.signIn();
    }

    onSignOutClick = ()=>{
        this.auth.signOut();
    }
    renderAuthButton(){
        if (this.props.isSignedIn === null){
            return null;
        } else if (this.props.isSignedIn){
            return <button onClick={this.onSignOutClick} className='ui red google button'>
                <i className='google icon' />
                Sign Out
            </button>
        } else {
            return <button onClick={this.onsignInClick} className='ui green google button'>
                <i className='google icon'/>
                Sign In
            </button>
        }
    }
    render(){
        return (<div>
            {this.renderAuthButton()}
        </div>
    )}
}
const mapStateToProps = (state)=>{
    return {isSignedIn: state.auth.isSignedIn}
}

export default connect(
    mapStateToProps, 
    { signIn, signOut}
    )(GoogleAuth);