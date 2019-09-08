const empData = {
  // Can add new users if needed, basically this should be an api
  employees: [
    {
      name: "Alan",
      id: "100",
      managerId: "150"
    },
    {
      name: "Martin",
      id: "220",
      managerId: "100"
    },
    {
      name: "Jamie",
      id: "150",
      managerId: ""
    },
    {
      name: "Alex",
      id: "275",
      managerId: "100"
    },
    {
      name: "Steve",
      id: "400",
      managerId: "150"
    },
    {
      name: "David",
      id: "190",
      managerId: "400"
    },
    {
      name: "Dummy Employee", // employee with no id, shud not appear in chart
      id: "",
      managerId: "400"
    }
  ]
};

export default empData;
