import React, { Component } from "react";
import OrgChart from "react-orgchart";
import "react-orgchart/index.css";
import EmpData from "./../resources/empData";

class OrgansiationalChart extends Component {
  state = {
    chartData: ""
  };

  componentDidMount() {
    this.formFinalData();
  }

  //form parent and child data and set the state accordingly
  formFinalData = () => {
    let cleanUpData = this.cleanUpData();
    let parentData = this.formParentData(cleanUpData);
    let childrenData = this.formChildrenData(parentData);

    parentData.children = childrenData;
    this.setState({ chartData: parentData });
  };

  /*
   * Added this functionality to remove any employee
   * who doesnt have any valid employee id,
   * Ideally there shud nt be any
   */
  cleanUpData = () => {
    let employeeList = EmpData.employees;
    for (let i = 0; i < employeeList.length; i++) {
      let id = employeeList[i].id;
      if (!id) {
        delete employeeList[i];
      }
    }
    employeeList = employeeList.filter(Boolean);
    return employeeList;
  };

  /* this is the top heirarchy, if there is no manager id, he is the top boss
   * Here the data has been read from a js object (EmpData),
   * basically this could be an api response
   */
  formParentData = employeeList => {
    let parentData = [];
    for (let i = 0; i < employeeList.length; i++) {
      let managerId = employeeList[i].managerId;

      if (!managerId) {
        parentData = employeeList[i];
        parentData.children = [];
        delete employeeList[i];
        parentData.children = employeeList;
        // assuming there is only one top boss
        break;
      }
    }

    return parentData;
  };

  /* form the children - employee data below the top layer
   * If the manager id matches the id of the employee, push the
   * data in to the children array
   */

  formChildrenData = parentData => {
    let childrenData = parentData.children.filter(Boolean);
    for (let i = 0; i < childrenData.length; i++) {
      if (childrenData[i]) {
        let id = childrenData[i].id;

        for (let j = 0; j < childrenData.length; j++) {
          if (childrenData[j]) {
            let managerId = childrenData[j].managerId;
            if (childrenData[j].id && id === managerId) {
              if (childrenData[i].children) {
                childrenData[i].children.push(childrenData[j]);
                delete childrenData[j];
              } else {
                childrenData[i].children = [];
                childrenData[i].children.push(childrenData[j]);
                delete childrenData[j];
              }
            }
          }
        }
      }
    }
    childrenData = childrenData.filter(Boolean);
    return childrenData;
  };

  dataComponent = ({ node }) => {
    return <div className="initechNode">{node.name}</div>;
  };

  render() {
    return (
      <OrgChart
        tree={this.state.chartData}
        NodeComponent={this.dataComponent}
      />
    );
  }
}

export default OrgansiationalChart;
