import { useState } from "react";
import Validation from "./Validation";
import Styles from "./Form.module.scss"



const Forms = ({login}) => {
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password:"",
    })
    const [errors, setErrors] = useState({
        email: "",
        password:"",
    })

    const handleChange = (event) =>{
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        });
        
            setErrors(
                Validation({
                  ...userData,
                  [event.target.name]: event.target.value,
                })
              );
            };
     const handleSubmit = (event) => {
                event.preventDefault();
                login(userData);
              };

    
    return (
    <div className={Styles.containerForm}>
        <form className={Styles.form}>
            <label className={Styles.label}>USUARIO: </label>
            <input className={Styles.input}
            placeholder="username"
            type="username" 
            name="username"
            value={userData.username}
            onChange={handleChange}
            />
            <label className={Styles.label}>EMAIL: </label>
            <input className={Styles.input}
            placeholder="email"
            type="email" 
            name="email"
            value={userData.email}
            onChange={handleChange}
            />
            
            <p className={Styles.p}>{errors.email}</p>
           
            <label className={Styles.label}>PASSWORD: </label>
            <input className={Styles.input}
            placeholder="password"
            type="password" 
            name ="password"
            value={userData.password}
            onChange={handleChange}
            />
            
            <p className={Styles.p}>{errors.password}</p>
            <button className={Styles.button} type="submit" onClick={handleSubmit}>Enviar</button>


        </form>
        </div>
    )
}
export default Forms;