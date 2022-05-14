import axios from "axios";
import { useEffect, useState } from "react";

function RoleEdit() {   
    const [data, setData] = useState([]);
    const [state1,setState1] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:4988/api/RoleCreate/RoleEdit', { params: { id: 'fed62419-87dd-4d36-b32f-0c2f8474946f' } });
            setData(response.data);
        }
        fetchData();
    }, [state1]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        const userData = {
        "roleId": "fed62419-87dd-4d36-b32f-0c2f8474946f",
        "roleName": "Admin",
        "idsToAdd" : [e.target.value],
        "idsToDelete" : []
        };
        setState1(userData)
        console.log(userData)
        axios.post("http://localhost:4988/api/RoleCreate/RoleEdit", userData).then((response) => {
          console.log(response.status);
          console.log(response.data);
        });
      };

    console.log(data)
    return (
        <div><h1 className="h3">Edit Role {data.role.name} </h1><hr /><div className="row">
            <div className="col-md-12">
                <form >
                    {/* <input type="hidden" name="roleId" value="{data.role.Id}" />
                    <input type="hidden" name="roleName" value="{data.role.name}" /> */}
                    <h6 className="bg-info text-white p-1">Add {data.role.name} </h6>
                    <table className="table table-bordered table-sm">
                        {console.log(data)}
                        {!data.nonMembers ?
                            <tr>
                                <td colSpan="2">Bütün kullanılar role ait</td>
                            </tr>
                            :
                            data.nonMembers.map(user => (
                                
                                <tr>
                                    <td>{user.userName}</td>
                                    <td>
                                        <input type="checkbox" name={user.id} id={user.id} onChange={handleSubmit} key={user.id} value={user.id} />
                                    </td>
                                </tr>
                            ))
                            }
                    </table>
                    <button type="submit" class="btn btn-primary">Save Changes</button>
</form><form>
                    <hr />

                    <h6 className="bg-info text-white p-1">Remove from {data.role.name} </h6>
                    <table className="table table-bordered table-sm">
                        {!data.members ?
                            <tr>
                                <td colSpan="2">Role ait kullanıcı yok.</td>
                            </tr>
                            :
                            data.members.map(user => (
                                <tr>
                                    <td>{user.userName}</td>
                                    <td>
                                        <input type="checkbox" name="idsToDelete" />
                                    </td>
                                </tr>
                            ))}
                    </table>

                    <button type="submit" class="btn btn-primary">Save Changes</button>

                </form >


            </div>
        </div></div>

    )


}
export default RoleEdit;