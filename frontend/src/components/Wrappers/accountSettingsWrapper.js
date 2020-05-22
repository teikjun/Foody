import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"
import CustomerAccountSettings from '../Customers/accountSettings'
import RestaurantStaffAccountSettings from '../RestaurantStaff/accountSettings'
import DeliveryRiderAccountSettings from '../DeliveryRiders/accountSettings'
import ManagerAccountSettings from '../Managers/accountSettings'
import { resetMsg } from 'actions/accountSettingsActions'

const AccountSettingsWrapper = (props) => {
    const { dispatch } = props
    
    useEffect(()=> { dispatch(resetMsg(), []) })

    switch (props.userType) {
        case 'customers':
            return <CustomerAccountSettings/>
        case 'restaurantstaff':
            return <RestaurantStaffAccountSettings/>
        case 'deliveryriders':
            return <DeliveryRiderAccountSettings/>
        case 'managers':
            return <ManagerAccountSettings/>
        default:
            return <div></div>
    }
}

const mapStateToProps = (state) => ({
    userType: state.auth.userType,
})

export default withRouter(connect(mapStateToProps)(AccountSettingsWrapper));