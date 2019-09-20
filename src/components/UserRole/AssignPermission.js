import React, { Fragment } from 'react'

import { Select, Checkbox, Divider, Table, Tag, Icon, Popconfirm } from 'antd';

import { removeRole, editRole, 
    searchByUserRoleID,
    checkAllOnChange,
    permissionOnChange } from '../../actions/userRoleActions';


const { Option } = Select;

const CheckboxGroup = Checkbox.Group;

export const AssignPermission = (props) => {

    const { dispatch, userRole } = props

    // const plainOptions = ['Apple', 'Pear', 'Orange'];
    // const defaultCheckedList = ['Apple', 'Orange'];

    function handleChange(_id) {
        console.log(`selected ${_id}`);

        dispatch( searchByUserRoleID(_id) )

    }

    return (
        <Fragment>
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a role"
                onChange={handleChange}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                <Option value={null}>Select Role</Option>
                {
                    userRole.roleList.map((item, index) =>
                        <Option value={item._id} key={index}>
                            {item.name}
                        </Option>
                    )
                }
            </Select>

            <Divider/>

            <div className="user_role_checkbox">
                <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                    <Checkbox
                        indeterminate={userRole.indeterminate}
                        onChange={ (e) => dispatch(checkAllOnChange(e.target.checked)) }
                        checked={userRole.checkAll}
                    >
                        Check all
                    </Checkbox>
                </div>
                <br />
                <CheckboxGroup
                    options={ userRole.plainOptions}
                    value={ userRole.roleItem.checkedList }
                    name={ userRole.roleItem.checkedList }
                    onChange={ (checkedList) => dispatch( permissionOnChange(checkedList) ) }
                />
            </div>
        </Fragment>
    )
}