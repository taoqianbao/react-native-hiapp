import React, {
    Component,
    StyleSheet,
    View,
    Text
} from 'react-native'

import GiftedListView from 'react-native-gifted-listview'
import ItemCell from '../../Components/ItemCell'
import styleUtils from '../../Styles'
import {ajax} from '../../Network'
import {getAvatarUrl} from '../../Utils'
import groupBy from 'lodash/groupBy'

export default class ContactsView extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <GiftedListView
                customStyles={customStyles}
                rowView={this._renderRowView}
                onFetch={this._onFetch}
                firstLoader={true}
                pagination={true}
                refreshable={false}
                withSections={true}
                paginationAllLoadedView={this._renderPaginationAllLoadedView}
                sectionHeaderView={this._renderSectionHeaderView}
                />
        )
    }

    _onFetch(page = 1, callback, options) {
        ajax({
            url: 'contacts.json'
        }).then(res => {
            if (!res.err_code) {
                let contacts = groupBy(res.data, contact => {
                    return contact.nickname.slice(0,1)
                })
                callback(contacts, {
                    allLoaded: true
                })
            }
        })
    }

    _renderRowView(conatct) {
        return (
            <ItemCell
                subText={conatct.location}
                showDisclosureIndicator={true}
                showBottomBorder={true}
                iconStyle={customStyles.itemCellIcon}
                icon={{ uri: getAvatarUrl(conatct.avatar) }}>
                {conatct.nickname}
            </ItemCell>
        )
    }

    _renderPaginationAllLoadedView() {
        return (
            <View></View>
        )
    }

    _renderSectionHeaderView(sectionData, sectionID) {
        return (
            <View style={Styles.sectionHeader}>
                <Text style={Styles.sectionHeaderText}>
                    {sectionID}
                </Text>
            </View>
        )
    }
}

const customStyles = {
    paginationView: {
        ...styleUtils.containerBg
    }
}

const Styles = StyleSheet.create({
    sectionHeader: {
        ...styleUtils.containerBg,
        height: 30,
        paddingLeft: 15,        
        justifyContent: 'center'         
    },
    sectionHeaderText: {
        color: '#8e8e93'
    }
})