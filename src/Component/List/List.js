import React, { useState, useRef } from "react";
import Form from "../Form/Form";
import Edit from "../Edit/Edit";
import { MdEdit, MdDelete, MdCheck, MdLocationOn } from "react-icons/md";
import "../style.scss";

if (!localStorage.getItem("listId")) {
    localStorage.setItem("listId", 1)
}
if (!localStorage.getItem("list")) {
    localStorage.setItem("list", JSON.stringify([]))
}
if (!localStorage.getItem("complate")) {
    localStorage.setItem("complate", JSON.stringify([]))
}
export default function List() {
    const [formOpen, setFormOpen] = useState(false)
    const [editOpen, setEditOpen] = useState({ id: 0, open: false })
    const [editId, setEditId] = useState(0)
    const [list, setList] = useState(JSON.parse(localStorage.getItem("list")))
    const [complate, setComplate] = useState(JSON.parse(localStorage.getItem("complate")))
    const [color, setColor] = useState()
    const [done, setDone] = useState(false)
    const skill = [
        {
            s: "Java Script",
            color: "Yellow"
        },
        {
            s: "React Js",
            color: "Blue"
        },
        {
            s: "C++",
            color: "Blue"
        },
        {
            s: "Java",
            color: "Red"
        },
        {
            s: "PHP",
            color: "green"
        },
        {
            s: "Node Js",
            color: "green"
        },
        {
            s: "Pyton",
            color: "blue"
        }
    ]
    const save = (e) => {
        e.preventDefault()
        const add = Array.from(new FormData(e.target))
        const saveObj = [{
            id: localStorage.getItem("listId"),
            name: add[0][1],
            lastName: add[1][1],
            location: add[2][1],
            skill: add[3][1],
            level: add[4][1],
            s: add[5][1],
            color: e.target[5][1].className,
            processing: "Processing"
        }]
        console.log(e.target[5][1].className)
        localStorage.setItem("listId", +localStorage.getItem("listId") + 1)
        localStorage.setItem("list", JSON.stringify([...JSON.parse(localStorage.getItem("list")), ...saveObj]))
        setList([...JSON.parse(localStorage.getItem("list"))])
    }

    const complateClick = (e) => {
        let date = new Date()
        let dd = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        let hours = date.getHours()
        let minute = date.getMinutes()
        let second = date.getSeconds()
        let fullDate = `${dd}.${month}.${year}`
        let fullHours = `${hours}:${minute}:${second}`
        list.map((elem) => {
            if (e.target.id == elem.id) {
                const complateArr = [
                    {
                        id: elem.id,
                        name: elem.name,
                        lastName: elem.lastName,
                        location: elem.location,
                        skill: elem.skill,
                        level: elem.level,
                        s: elem.s,
                        color: elem.color,
                        date: fullDate,
                        hours: fullHours,
                        complated: "Complated"
                    }
                ]
                localStorage.setItem("complate", JSON.stringify([...JSON.parse(localStorage.getItem("complate")), ...complateArr]))
                setComplate([...JSON.parse(localStorage.getItem("complate"))])
            }
        })
        const data = JSON.parse(localStorage.getItem("list")).filter((elem) => {
            return e.currentTarget.id != elem.id
        })
        localStorage.setItem("list", JSON.stringify(data))
        setList(JSON.parse(localStorage.getItem("list")))
    }

    const todoDelete = (e) => {
        const data = JSON.parse(localStorage.getItem("list")).filter((elem) => {
            return e.currentTarget.id != elem.id
        })
        localStorage.setItem("list", JSON.stringify(data))
        setList(JSON.parse(localStorage.getItem("list")))
    }

    const complateDelete = (e) => {
        const data = JSON.parse(localStorage.getItem("complate")).filter((elem) => {
            return e.currentTarget.id != elem.id
        })
        console.log(data)
        localStorage.setItem("complate", JSON.stringify(data))
        setComplate(JSON.parse(localStorage.getItem("complate")))
    }

    const add = () => {
        setFormOpen(true)
        if (editOpen) {
            setEditOpen({ open: false })
        }
    }
    const edit = (e) => {
        setEditOpen({ id: e.target.id, open: true})
        setEditId(e.currentTarget.id)
        if (formOpen) {
            setFormOpen(false)
        }
        console.log(e.currentTarget.id)
    }
    

    const complateEdit = (e)=>{
        console.log(e.target)
    }

    const editSave = (e) => {
        e.preventDefault()
        const editNewArr = []
        const editForm = [...Array.from(new FormData(e.target))]
        JSON.parse(localStorage.getItem("list")).map((elem) => {
            if (editId == elem.id) {
                elem.name = editForm[0][1]
                elem.lastName = editForm[1][1]
                elem.location = editForm[2][1]
                elem.skill = editForm[3][1]
                elem.level = editForm[4][1]
            }
            editNewArr.push(elem)
        })
        localStorage.setItem("list", JSON.stringify(editNewArr))
        setList(JSON.parse(localStorage.getItem("list")))

    }
    return (
        <div className="header">
            {formOpen && <Form save={save} skill={skill} setFormOpen={setFormOpen}></Form>}
            {editOpen.open && <Edit setEditOpen={setEditOpen} editSave={editSave}></Edit>}
            <div className="buttonsCont">
                <div className="toComplateButtons">
                    <button className={done == false ? "active" : ""} onClick={() => setDone(false)}>ToDo</button>
                    <button className={done == true ? "active" : ""} onClick={() => setDone(true)}>Complate</button>
                </div>
                <div>
                    <button onClick={add}>Add</button>
                </div>
            </div>
            <div className="listCont">
                {!done ? list.map((elem, index) => {
                    return <div key={index} className="listCard" id={elem.id} style={{ borderLeft: `2px solid ${elem.color}` }}>
                        <div className="description">
                            <span>{`${elem.name} ${elem.lastName}`}</span>
                            <div>
                                <MdLocationOn></MdLocationOn><span>{elem.location}</span>
                            </div>
                            <div>
                                <span>{elem.level}</span>
                            </div>
                        </div>
                        <span>{elem.s}</span>
                        <div className="processing">{elem.processing}</div>
                        <div className="cardIcon">
                            <MdEdit onClick={edit} id={elem.id}></MdEdit>
                            <MdDelete id={elem.id} onClick={todoDelete}></MdDelete>
                            <MdCheck onClick={complateClick} id={elem.id}></MdCheck>
                        </div>
                    </div>
                }) : complate.map((elem, index) => {
                    return <div key={index} className="listCard" id={elem.id} style={{ borderLeft: `2px solid lightgreen` }}>
                        <div className="description">
                            <span>{`${elem.name} ${elem.lastName}`}</span>
                            <div>
                                <MdLocationOn></MdLocationOn><span>{elem.location}</span>
                            </div>
                            <div>
                                <span>{elem.level}</span>
                            </div>
                            <div className="time">
                                <span>{elem.date}</span>
                                <span>{elem.hours}</span>
                            </div>
                        </div>
                        <span>{elem.s}</span>
                        <div className="complated">{elem.complated}</div>
                        <div className="cardIcon">
                            <MdEdit id={elem.id} onClick={complateEdit}></MdEdit>
                            <MdDelete id={elem.id} onClick={complateDelete}></MdDelete>
                            {/* <MdCheck onClick={complateClick} id={elem.id}></MdCheck> */}
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}