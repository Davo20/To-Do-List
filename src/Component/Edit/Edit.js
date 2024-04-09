import React from "react";

export default function Edit ({setEditOpen, editSave}) {
    return(
        <div className="formContainer">
            <form onSubmit={editSave}>
                <div className="inputs">
                    <input type="text" name="name" placeholder="Name"></input>
                    <input type="text" name="lastName" placeholder="Last name"></input>
                    <input type="text" name="location" placeholder="Location"></input>
                    <input type="text" name="level" placeholder="Level"></input>
                    {/* <select name="select">
                        {skill.map((elem, index) => {
                            return <option value={elem.s} className={elem.color} key={index} >{elem.s}</option>
                        })}
                    </select> */}
                </div>
                <div className="buttonsForm">
                    <button type="submit">Save</button>
                    <button type="button" onClick={()=>setEditOpen(false)}>Close</button>
                </div>
            </form>
        </div>
    )
}