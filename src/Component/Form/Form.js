import React from "react";

export default function Form({ save, skill, setFormOpen }) {
    // const skill = [
    //     {
    //         s: "Java Script",
    //         color: "Yellow"
    //     },
    //     {
    //         s: "React Js",
    //         color: "Blue"
    //     },
    //     {
    //         s: "C++",
    //         color: "Blue"
    //     },
    //     {
    //         s: "Java",
    //         color: "Red"
    //     },
    //     {
    //        s: "PHP",
    //        color: "green"
    //     },
    //     {
    //         s: "Node Js",
    //         color: "green"
    //     },
    //     {
    //         s: "Pyton",
    //         color: "blue"
    //     }
    // ]
    return (
        <div className="formContainer">
            <form onSubmit={save}>
                <div className="inputs">
                    <input type="text" name="name" placeholder="Name"></input>
                    <input type="text" name="lastName" placeholder="Last name"></input>
                    <input type="text" name="location" placeholder="Location"></input>
                    <input type="text" name="level" placeholder="Level"></input>
                    <select name="select">
                        {skill.map((elem, index) => {
                            return <option value={elem.s} className={elem.color} key={index} >{elem.s}</option>
                        })}
                    </select>
                </div>
                <div className="buttonsForm">
                    <button type="submit">Add</button>
                    <button type="button" onClick={()=>setFormOpen(false)}>Close</button>
                </div>
            </form>
        </div>
    )
}