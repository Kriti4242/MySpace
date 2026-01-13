import { useEffect, useState } from "react"
import API from "../api"

export default function Dashboard() {
  const [tab, setTab] = useState("study")
 const [user, setUser] = useState(null)

  // Checklist
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState("")
  const [taskSearch, setTaskSearch] = useState("")

  // Study
  const [study, setStudy] = useState([])
  const [subject, setSubject] = useState("")
  const [topic, setTopic] = useState("")
  const [deadline, setDeadline] = useState("")
  const [studySearch, setStudySearch] = useState("")
  const [studyStatus, setStudyStatus] = useState({})

  // Jobs
  const [jobs, setJobs] = useState([])
  const [company, setCompany] = useState("")
  const [role, setRole] = useState("")
  const [jobSearch, setJobSearch] = useState("")

  // Notes
  const [notes, setNotes] = useState([])
  const [noteTitle, setNoteTitle] = useState("")
  const [content, setContent] = useState("")
  const [openNoteId, setOpenNoteId] = useState(null)
  const [editingNote, setEditingNote] = useState(null)
  const [noteSearch, setNoteSearch] = useState("")

  const refresh = () => {
    API.get("/tasks").then(r => setTasks(r.data))
    API.get("/study").then(r => setStudy(r.data))
    API.get("/jobs").then(r => setJobs(r.data))
    API.get("/notes").then(r => setNotes(r.data))
  }

  useEffect(() => {
    API.get("/auth/me").then(r => setUser(r.data))
    refresh()
  }, [])

  const filteredTasks = tasks.filter(t =>
    t.title.toLowerCase().includes(taskSearch.toLowerCase())
  )

  const filteredStudy = study.filter(s =>
    (s.subject + s.topic).toLowerCase().includes(studySearch.toLowerCase())
  )

  const filteredJobs = jobs.filter(j =>
    (j.company + j.role + j.status).toLowerCase().includes(jobSearch.toLowerCase())
  )

  const filteredNotes = notes.filter(n =>
    (n.title + n.content).toLowerCase().includes(noteSearch.toLowerCase())
  )

  const changeJobStatus = async (id, status) => {
    await API.patch("/jobs/" + id, { status })
    refresh()
  }

  useEffect(() => {
  API.get("/auth/me").then(r => setUser(r.data))
  refresh()
}, [])
if (!user) {
  return <div style={{ padding: 40 }}>Loading...</div>
}

  return (
    <div className="app">
      <div className="sidebar">
        <h2>MySpace</h2>
        <button className={tab==="study"?"active":""} onClick={()=>setTab("study")}>📚 Study Plan</button>
        <button className={tab==="jobs"?"active":""} onClick={()=>setTab("jobs")}>💼 Jobs Applied</button>
        <button className={tab==="notes"?"active":""} onClick={()=>setTab("notes")}>📝 My Notes</button>
        <button className={tab==="tasks"?"active":""} onClick={()=>setTab("tasks")}>✔ Checklist</button>
      </div>

      <div className="main">
        <div className="topbar">
          <h3>Welcome, {user?.name || "User"}</h3>
          <button onClick={()=>{
            localStorage.removeItem("token")
            window.location="/"
          }}>Logout</button>
        </div>

        {/* STUDY */}
        {tab==="study" && (
          <>
            <input placeholder="Search..." value={studySearch} onChange={e=>setStudySearch(e.target.value)} />
            <input placeholder="Subject" value={subject} onChange={e=>setSubject(e.target.value)} />
            <input placeholder="Topic" value={topic} onChange={e=>setTopic(e.target.value)} />
            <input placeholder="Deadline" value={deadline} onChange={e=>setDeadline(e.target.value)} />
            <button onClick={async()=>{
              await API.post("/study",{subject,topic,deadline})
              setSubject("");setTopic("");setDeadline("")
              refresh()
            }}>Add</button>

            {filteredStudy.map(s=>(
  <div className="task" key={s._id} style={{
    borderLeft: studyStatus[s._id]==="Completed" ? "5px solid #10b981" :
                studyStatus[s._id]==="Incomplete" ? "5px solid #f59e0b" :
                "5px solid transparent"
  }}>
    <div>
      <strong>📚 {s.subject}</strong><br/>
      <span>📝 {s.topic}</span><br/>
      <span>📅 {s.deadline}</span>
    </div>

    <div>
      <button 
        style={{background: studyStatus[s._id]==="Completed" ? "#10b981" : "#374151"}}
        onClick={()=>setStudyStatus({...studyStatus, [s._id]:"Completed"})}
      >
        ✔ Completed
      </button>

      <button 
        style={{background: studyStatus[s._id]==="Incomplete" ? "#f59e0b" : "#374151"}}
        onClick={()=>setStudyStatus({...studyStatus, [s._id]:"Incomplete"})}
      >
        ⏳ Incomplete
      </button>

      <button onClick={()=>API.delete("/study/"+s._id).then(refresh)}>❌</button>
    </div>
  </div>
))}
          </>
        )}

        {/* JOBS */}
        {tab==="jobs" && (
          <>
            <input placeholder="Search..." value={jobSearch} onChange={e=>setJobSearch(e.target.value)} />
            <input placeholder="Company" value={company} onChange={e=>setCompany(e.target.value)} />
            <input placeholder="Role" value={role} onChange={e=>setRole(e.target.value)} />
            <button onClick={async()=>{
              await API.post("/jobs",{company,role,status:"Applied"})
              setCompany("");setRole("")
              refresh()
            }}>Add</button>

            {filteredJobs.map(j=>(
              <div key={j._id} className="task" style={{textDecoration:j.status==="Rejected"?"line-through":"none"}}>
                <span>{j.company} - {j.role} - {j.status}</span>
                <div>
                  {["Interviewed","Selected","Rejected"].map(s=>(
                    <button key={s} style={{background:j.status===s?"green":"#6366f1"}} onClick={()=>changeJobStatus(j._id,s)}>{s}</button>
                  ))}
                  <button onClick={()=>API.delete("/jobs/"+j._id).then(refresh)}>❌</button>
                </div>
              </div>
            ))}
          </>
        )}

        {/* NOTES */}
        {tab==="notes" && (
          <>
            <input placeholder="Search..." value={noteSearch} onChange={e=>setNoteSearch(e.target.value)} />
            <input placeholder="Title" value={noteTitle} onChange={e=>setNoteTitle(e.target.value)} />
            <input placeholder="Content" value={content} onChange={e=>setContent(e.target.value)} />
            <button onClick={async()=>{
              await API.post("/notes",{title:noteTitle,content})
              setNoteTitle("");setContent("")
              refresh()
            }}>Add</button>

            {filteredNotes.map(n=>(
              <div key={n._id} className="note-card">
                <div className="note-header">
                  <span onClick={()=>setOpenNoteId(openNoteId===n._id?null:n._id)}>{n.title}</span>
                  <div className="note-actions">
                    <button onClick={()=>setEditingNote(n)}>Edit</button>
                    <button onClick={()=>API.delete("/notes/"+n._id).then(refresh)}>❌</button>
                  </div>
                </div>
                {openNoteId===n._id && <div className="note-content">{n.content}</div>}
              </div>
            ))}

            {editingNote && (
              <div className="note-card">
                <input value={editingNote.title} onChange={e=>setEditingNote({...editingNote,title:e.target.value})}/>
                <input value={editingNote.content} onChange={e=>setEditingNote({...editingNote,content:e.target.value})}/>
                <button onClick={async()=>{
                  await API.patch("/notes/"+editingNote._id,editingNote)
                  setEditingNote(null)
                  refresh()
                }}>Save</button>
              </div>
            )}
          </>
        )}

        {/* CHECKLIST */}
        {tab==="tasks" && (
          <>
            <input placeholder="Search..." value={taskSearch} onChange={e=>setTaskSearch(e.target.value)} />
            <input placeholder="New task" value={title} onChange={e=>setTitle(e.target.value)} />
            <button onClick={async()=>{
              await API.post("/tasks",{title})
              setTitle("")
              refresh()
            }}>Add</button>

            {filteredTasks.map(t=>(
              <div className="task" key={t._id}>
                <span>{t.title}</span>
                <div>
                  <button onClick={()=>API.delete("/tasks/"+t._id).then(refresh)}>❌</button>
                </div>
              </div>
            ))}
          </>
        )}

      </div>
    </div>
  )
}

