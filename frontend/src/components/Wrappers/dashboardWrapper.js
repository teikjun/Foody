import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"
import CustomerDashboard from '../Customers/dashboard'
import RestaurantStaffDashboard from '../RestaurantStaff/dashboard'
import DeliveryRiderDashboard from '../DeliveryRiders/dashboard'
import ManagerDashboard from '../Managers/dashboard'

const DashboardWrapper = (props) => {
    switch(props.userType) {
        case 'customers':
            return <CustomerDashboard/>
        case 'restaurantstaff':
            return <RestaurantStaffDashboard/>
        case 'deliveryriders':
            return <DeliveryRiderDashboard/>
        case 'managers':
            return <ManagerDashboard/>
        default:
            return <div></div>
    }
}

const mapStateToProps = (state) => ({
    userType: state.auth.userType,
})

export default withRouter(connect(mapStateToProps)(DashboardWrapper));