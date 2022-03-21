import React, { useState } from "react";
import styles from './Dashboard.module.css'
const Dashboard = () => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState("");
  const [employeeData, setEmployeeData] = useState([]);


  React.useEffect(()=>{
    getData();
  },[])

  const getData =()=>{
    fetch(`http://localhost:3001/employees`)
      .then((res)=>res.json())
      .then((res)=>setEmployeeData(res))
      .catch((err)=>console.log(err))
  }


const handleAdd = () =>{
    const payload ={
        name,
        department,
        gender,
        role,
        salary
    }

    const jsonpayload = JSON.stringify(payload)
    fetch(`http://localhost:3001/employees`, {
      method: "POST",
      body: jsonpayload,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((res)=>{
      getData();
    })

    setName("")
    setDepartment("")
    setGender("")
    setRole("")
    setSalary("")

}

const showMarketingData=()=>{
    const UpdatedData = employeeData.filter((item)=>{
        if(item.department === "Marketing"){
            return item
        }
    })
    setEmployeeData(UpdatedData)
}

const showITData=()=>{
    const UpdatedData = employeeData.filter((item)=>{
        if(item.department === "IT"){
            return item
        }
    })
    setEmployeeData(UpdatedData)
}

const showFinanceData=()=>{
    const UpdatedData = employeeData.filter((item)=>{
        if(item.department === "Finance"){
            return item
        }
    })
    setEmployeeData(UpdatedData)
}

const showHRData=()=>{
    const UpdatedData = employeeData.filter((item)=>{
        if(item.department === "HR"){
            return item
        }
    })
    setEmployeeData(UpdatedData)
}

  return (
    <div>
    <h1>Employee Dashboard</h1>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />
      <input
        placeholder="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      />
      <br /><br />
      <input
        placeholder="Gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      />
      <br /><br />
      <input
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <br /><br />
      <input
        placeholder="Salary"
        value={salary}
        onChange={(e) => setSalary(Number(e.target.value))}
      />
      <br /><br />

      <button onClick={()=>handleAdd()}>Add Employee</button><br />
      <hr/>

      <button>Show All Departments</button>
      <button onClick={()=>showMarketingData()}>Show Marketing</button>
      <button onClick={()=>showITData()}>Show IT</button>
      <button onClick={()=>showHRData()}>Show HR</button>
      <button onClick={()=>showFinanceData()}>Show Finance</button>
      <button>Sort By Salary Ascending</button>
      <button>Sort By Salary Descending</button>
     

        {
            employeeData.map((item)=>{
                return <div key={item.id} className={styles.dataContainer}>
                    <label>Name :</label>
                    <span>{item.name}</span><br/>
                    <label>Department :</label>
                    <span>{item.department}</span><br/>
                    <label>Gender :</label>
                    <span>{item.gender}</span><br/>
                    <label>Role :</label>
                    <span>{item.role}</span><br/>
                    <label>Salary :</label>
                    <span>{item.salary}</span>
                </div>

            })
        }
    </div>
  );
};

export { Dashboard };
