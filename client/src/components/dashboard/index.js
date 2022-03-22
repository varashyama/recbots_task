import './dashboard.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const planArr = ["Silver", "Gold", "Diamond", "Platinum"];

const Dashboard = () => {
    const [details, setDetails] = useState({});
    const params = useParams();
    const id = params.id;


    function handleUpdate(id, plan) {
        const planCheck = planArr.indexOf(plan);
        console.log(id);
        const newPlan = planArr[planCheck + 1];
        axios.post(`http://localhost:5000/user/${id}`, {plan:newPlan})
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    console.log('plan Upgraded');
                    alert('successfully Upgraded your plan');
                    getUserData();
                }
                else if (response.status === 400) {
                    alert('Please try again');
                }
            })
            .catch(error => {
                console.log(error)
            })
    }


    function getUserData() {
        axios.get(`http://localhost:5000/user/${id}`)
            .then(response => {
                const data = response.data;
                setDetails(data);
                console.log(data);
            })
    }

    useEffect(() => {
        getUserData()
    }, []);

    const fullName = details.fullName;
    const userId = details._id;
    const plan = details.plan;

    return (
        <section>
            <div>
                <h2 className="text-center my-5 text-primary">WELCOME {fullName} </h2>

                <div className="plan_card text-center py-5 d-flex justify-content-around w-50 m-auto">
                    <div className='ms-3'>
                        <p className="my-3  p-3 bg-primary d-inline-block">Your Current Plan :</p>
                        <p className=" fs-1">{details.plan}</p>
                        <button className="bg-primary text-white p-3  border" onClick={() => { handleUpdate(userId,plan) }}>Upgrade your plan</button>
                    </div>
                    <div>
                        <h2>Top Plans:</h2>
                        {planArr.map((item, index) => {

                            return (
                                <div className='my-3' key={item}>
                                    {item}
                                </div>
                            )
                        })}
                    </div>

                </div>
            </div>

        </section>
    )
}

export default Dashboard;