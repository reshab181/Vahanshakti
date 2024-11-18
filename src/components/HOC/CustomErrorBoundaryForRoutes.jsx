// ===============================================
// Component: CustomErrorBoundaryForRoutes.jsx
// Description: Components Error Handling
// ===============================================

import React from 'react'
import './error.css'

class CustomErrorBoundaryForRoutes extends React.Component {
   
    constructor(props) {
        super(props);
        this.state = { hasError: false };

    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    
    render() {
        
        function delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        
        async function backAndReload() {
            window.history.back();
            await delay(50);
            window.location.reload();
        }

        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <>
                    <div className='error-container'>
                        <div className='error-sub-container'>
                            <div className='error-wrapper'>
                                <h1 className=''>😔 {this.props?.errorMsg} 😔</h1>
                                <div className='button-wrapper'>
                                    <button onClick={() => backAndReload()} className="back-btn">Go Back</button>
                                    <button onClick={() => (window.localStorage.clear(), window.location.replace('/'))} className="out-btn">Log Out</button>
                                    <button onClick={() => window.location.reload()} className="reload-btn">Reload</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        }

        return this.props.children;
    }
}
export default CustomErrorBoundaryForRoutes