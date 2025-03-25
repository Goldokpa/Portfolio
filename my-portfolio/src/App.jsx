import { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import { User, Mail, Briefcase, Terminal, BookOpen, FileText, Trash2, NotebookText, Save, X, Trash } from "lucide-react";
import Background from "./components/Background";
import About from "./pages/About";

function App() {
  const [activeWindow, setActiveWindow] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [booting, setBooting] = useState(true);
  const [bootStep, setBootStep] = useState(0);
  const [notepadContent, setNotepadContent] = useState("");
  const [savedNotes, setSavedNotes] = useState([]);
  const [currentNoteTitle, setCurrentNoteTitle] = useState("");
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const notepadTextareaRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Desktop icons as seen in the images
  const desktopIcons = [
    { name: "My Computer", icon: <div className="win98-icon computer-icon"></div> },
    { name: "About", icon: <User size={24} className="win98-icon" /> },
    { name: "Contact", icon: <Mail size={24} className="win98-icon" /> },
    { name: "Projects", icon: <Briefcase size={24} className="win98-icon" /> },
    { name: "Terminal", icon: <Terminal size={24} className="win98-icon" /> },
    { name: "Blog", icon: <BookOpen size={24} className="win98-icon" /> },
    { name: "Resume", icon: <FileText size={24} className="win98-icon" /> },
    { name: "Recycle Bin", icon: <Trash2 size={24} className="win98-icon" /> },
    { name: "Notepad", icon: <NotebookText size={24} className="win98-icon" /> },
  ];

  // Focus on textarea when notepad is opened
  useEffect(() => {
    if (activeWindow === "Notepad" && notepadTextareaRef.current) {
      notepadTextareaRef.current.focus();
    }
  }, [activeWindow]);

  // Load saved notes from localStorage on initial render
  useEffect(() => {
    try {
      const savedNotesFromStorage = localStorage.getItem("win98Notes");
      if (savedNotesFromStorage) {
        setSavedNotes(JSON.parse(savedNotesFromStorage));
      }
    } catch (error) {
      console.error("Error loading notes from storage:", error);
      setSavedNotes([]);
    }
  }, []);

  // Save notes to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("win98Notes", JSON.stringify(savedNotes));
    } catch (error) {
      console.error("Error saving notes to storage:", error);
    }
  }, [savedNotes]);

  // Boot animation sequence
  useEffect(() => {
    if (booting) {
      const bootSequence = [
        "Starting Windows 98...",
        "Checking system configuration...",
        "Loading personal profile...",
        "Preparing desktop environment...",
        "Welcome to Windows 98"
      ];
      
      if (bootStep < bootSequence.length) {
        const timer = setTimeout(() => {
          setBootStep(bootStep + 1);
        }, 1500);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setBooting(false);
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [booting, bootStep]);

  // Update clock every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Format time for taskbar (e.g., 8:08 PM)
  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
  };

  const openWindow = (window) => {
    if (window === "About") {
      navigate("/about");
    } else {
      setActiveWindow(window);
    }
    setStartMenuOpen(false);
    
    // Reset notepad content when opening a new notepad
    if (window === "Notepad") {
      setNotepadContent("");
      setCurrentNoteTitle("");
    }
  };

  // Return to desktop from any page
  const handleReturnToDesktop = () => {
    navigate("/");
  };

  const toggleStartMenu = () => {
    setStartMenuOpen(!startMenuOpen);
  };

  // Save note function with validation
  const saveNote = () => {
    try {
      if (currentNoteTitle.trim() === "") {
        alert("Please enter a title for your note");
        return;
      }

      // Check for duplicate titles
      if (savedNotes.some(note => note.title === currentNoteTitle.trim())) {
        alert("A note with this title already exists. Please choose a different title.");
        return;
      }

      const newNote = {
        id: Date.now(),
        title: currentNoteTitle.trim(),
        content: notepadContent,
        date: new Date().toLocaleString()
      };

      setSavedNotes(prev => [...prev, newNote]);
      setCurrentNoteTitle("");
      setNotepadContent("");
      setShowSaveDialog(false);
    } catch (error) {
      console.error("Error saving note:", error);
      alert("There was an error saving your note. Please try again.");
    }
  };

  // Delete note function with confirmation
  const deleteNote = (noteId) => {
    try {
      if (window.confirm("Are you sure you want to delete this note?")) {
        setSavedNotes(prev => prev.filter(note => note.id !== noteId));
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("There was an error deleting the note. Please try again.");
    }
  };

  // Load note function with error handling
  const loadNote = (note) => {
    try {
      setNotepadContent(note.content);
      setCurrentNoteTitle(note.title);
      setActiveWindow("Notepad");
    } catch (error) {
      console.error("Error loading note:", error);
      alert("There was an error loading the note. Please try again.");
    }
  };

  // Render boot screen
  if (booting) {
    return (
      <div className="boot-screen">
        <div className="boot-content">
          <div className="windows-logo-boot">
            <div className="boot-logo-quadrant red"></div>
            <div className="boot-logo-quadrant green"></div>
            <div className="boot-logo-quadrant blue"></div>
            <div className="boot-logo-quadrant yellow"></div>
          </div>
          <div className="boot-message">
            {bootStep < 5 ? (
              <>
                <div className="boot-text">
                  {bootStep === 0 && "Starting Windows 98..."}
                  {bootStep === 1 && "Checking system configuration..."}
                  {bootStep === 2 && "Loading personal profile..."}
                  {bootStep === 3 && "Preparing desktop environment..."}
                  {bootStep === 4 && "Welcome to Windows 98"}
                </div>
                <div className="boot-progress">
                  <div className="progress-bar" style={{ width: `${(bootStep + 1) * 20}%` }}></div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  // If we're on a specific page route, render that page
  if (location.pathname === "/about") {
    return <About onClose={handleReturnToDesktop} />;
  }

  // Render active window content based on which window is open
  const renderWindowContent = () => {
    switch (activeWindow) {
      case "About":
        return (
          <div className="window-frame">
            <div className="window-titlebar">
              <div className="titlebar-icon"><User size={16} /></div>
              <div className="titlebar-text">About</div>
              <div className="window-controls">
                <button className="control-button minimize">_</button>
                <button className="control-button maximize">□</button>
                <button className="control-button close" onClick={() => setActiveWindow(null)}>×</button>
              </div>
            </div>
            <div className="window-menu">
              <span>File</span>
              <span>Edit</span>
              <span>View</span>
              <span>Help</span>
            </div>
            <div className="window-content about-content">
              <h1 className="about-name">Gold Okpa</h1>
              <div className="about-question">How can I help bring your ideas to life?</div>
              
              <div className="about-contact">
                <div className="contact-item">
                  <span className="label">Email:</span>
                  <a href="mailto:okpalgold@gmail.com" className="win98-link">okpalgold@gmail.com</a>
                </div>
              </div>

              <div className="about-section">
                {/* Placeholder for profile picture - you can add your picture here */}
                <div className="profile-picture-placeholder">
                  <div className="add-picture-text">Add your profile picture here</div>
                </div>
                
                <div className="about-text">
                  <p>
                    I am a passionate developer with a keen interest in creating engaging and functional web applications. 
                    My expertise includes building responsive websites and implementing modern design patterns.
                  </p>
                  
                  <h2 className="section-title">Skills & Technologies</h2>
                  <div className="skills-grid">
                    <div className="skill-item">React</div>
                    <div className="skill-item">JavaScript</div>
                    <div className="skill-item">HTML/CSS</div>
                    <div className="skill-item">Node.js</div>
                    <div className="skill-item">Git</div>
                    <div className="skill-item">Responsive Design</div>
                  </div>

                  <h2 className="section-title">Connect With Me</h2>
                  <div className="social-links">
                    <a href="#" className="win98-link">LinkedIn</a>
                    <a href="#" className="win98-link">GitHub</a>
                    <a href="#" className="win98-link">Twitter</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="window-statusbar">
              <div className="statusbar-item">Ready</div>
            </div>
          </div>
        );
      case "Projects":
        return (
          <div className="window-frame">
            <div className="window-titlebar">
              <div className="titlebar-icon"><Briefcase size={16} /></div>
              <div className="titlebar-text">Projects</div>
              <div className="window-controls">
                <button className="control-button minimize">_</button>
                <button className="control-button maximize">□</button>
                <button className="control-button close" onClick={() => setActiveWindow(null)}>×</button>
              </div>
            </div>
            <div className="window-menu">
              <span>File</span>
              <span>Edit</span>
              <span>View</span>
              <span>Help</span>
            </div>
            <div className="window-content">
              <h1 className="window-title">PORTFOLIO</h1>
              <div className="project-links">
                <a href="#" className="win98-link">Portfolio</a>
                <a href="#" className="win98-link">Github</a>
              </div>
              <p>
                You're on it! Inspired by Windows 98, this is a new redesign for my portfolio to showcase my skills, using a whole mess of components from the incredible <a href="#" className="win98-link">shadcn-ui</a>.
              </p>
              <div className="project-grid">
                <div className="project-item">
                  <div className="project-icon">
                    <Briefcase size={32} />
                  </div>
                  <div className="project-name">Portfolio</div>
                </div>
                <div className="project-item">
                  <div className="project-icon">
                    <BookOpen size={32} />
                  </div>
                  <div className="project-name">Family Recipes</div>
                </div>
                <div className="project-item">
                  <div className="project-icon">
                    <Terminal size={32} />
                  </div>
                  <div className="project-name">Luz Electric</div>
                </div>
                <div className="project-item">
                  <div className="project-icon">
                    <Terminal size={32} />
                  </div>
                  <div className="project-name">jccbot</div>
                </div>
              </div>
            </div>
            <div className="window-statusbar">
              <div className="statusbar-item">4 items</div>
              <div className="statusbar-item right">View details</div>
            </div>
          </div>
        );
      case "My Computer":
        return (
          <div className="window-frame">
            <div className="window-titlebar">
              <div className="titlebar-icon"><div className="computer-small-icon"></div></div>
              <div className="titlebar-text">My Computer</div>
              <div className="window-controls">
                <button className="control-button minimize">_</button>
                <button className="control-button maximize">□</button>
                <button className="control-button close" onClick={() => setActiveWindow(null)}>×</button>
              </div>
            </div>
            <div className="window-menu">
              <span>File</span>
              <span>Edit</span>
              <span>View</span>
              <span>Help</span>
            </div>
            <div className="window-content">
              <h1 className="window-title">System Properties</h1>
              <div className="system-properties">
                <div className="properties-section">
                  <div className="computer-big-icon"></div>
                  <div className="properties-text">
                    <p className="properties-name">Web Developer Machine</p>
                    <p>Microsoft Windows 98</p>
                    <p>React 18.3 Build 42069</p>
                  </div>
                </div>
                <div className="properties-tabs">
                  <div className="tab active">General</div>
                  <div className="tab">Skills</div>
                  <div className="tab">Experience</div>
                </div>
                <div className="properties-info">
                  <p><strong>Registered to:</strong> Web Developer Extraordinaire</p>
                  <p><strong>Physical Memory:</strong> 640K Conventional, 31M Extended</p>
                  <p><strong>System:</strong> ReactJS running on Vite</p>
                </div>
                <div className="properties-buttons">
                  <button className="win98-button">OK</button>
                  <button className="win98-button">Cancel</button>
                </div>
              </div>
            </div>
            <div className="window-statusbar">
              <div className="statusbar-item">My Computer</div>
            </div>
          </div>
        );
      case "Notepad":
        return (
          <div className="window-frame">
            <div className="window-titlebar">
              <div className="titlebar-icon"><NotebookText size={16} /></div>
              <div className="titlebar-text">
                {currentNoteTitle ? `Notepad - ${currentNoteTitle}` : "Untitled - Notepad"}
              </div>
              <div className="window-controls">
                <button className="control-button minimize">_</button>
                <button className="control-button maximize">□</button>
                <button className="control-button close" onClick={() => setActiveWindow(null)}>×</button>
              </div>
            </div>
            <div className="window-menu">
              <span onClick={() => setShowSaveDialog(true)}>File</span>
              <span>Edit</span>
              <span>Format</span>
              <span>View</span>
              <span>Help</span>
            </div>
            <div className="window-content notepad-content">
              <textarea 
                ref={notepadTextareaRef}
                value={notepadContent}
                onChange={(e) => setNotepadContent(e.target.value)}
                className="notepad-textarea"
                placeholder="Type your text here..."
              />
              
              {/* Save Dialog */}
              {showSaveDialog && (
                <div className="save-dialog">
                  <div className="save-dialog-title">Save As</div>
                  <div className="save-dialog-content">
                    <label>File name:</label>
                    <input 
                      type="text"
                      value={currentNoteTitle}
                      onChange={(e) => setCurrentNoteTitle(e.target.value)}
                      placeholder="Untitled"
                      className="save-dialog-input"
                    />
                    <div className="save-dialog-buttons">
                      <button className="win98-button" onClick={saveNote}>Save</button>
                      <button className="win98-button" onClick={() => setShowSaveDialog(false)}>Cancel</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="window-statusbar">
              <div className="statusbar-item">
                {notepadContent.length} characters
              </div>
            </div>
          </div>
        );
      case "Notes":
        return (
          <div className="window-frame">
            <div className="window-titlebar">
              <div className="titlebar-icon"><NotebookText size={16} /></div>
              <div className="titlebar-text">My Notes</div>
              <div className="window-controls">
                <button className="control-button minimize">_</button>
                <button className="control-button maximize">□</button>
                <button className="control-button close" onClick={() => setActiveWindow(null)}>×</button>
              </div>
            </div>
            <div className="window-menu">
              <span>File</span>
              <span>Edit</span>
              <span>View</span>
              <span>Help</span>
            </div>
            <div className="window-content">
              <h2 className="window-subtitle">Saved Notes</h2>
              {savedNotes.length === 0 ? (
                <p>No saved notes yet.</p>
              ) : (
                <div className="notes-list">
                  {savedNotes.map(note => (
                    <div key={note.id} className="note-item">
                      <div className="note-title" onClick={() => loadNote(note)}>
                        <NotebookText size={16} className="note-icon" />
                        <span>{note.title}</span>
                      </div>
                      <div className="note-date">{note.date}</div>
                      <button className="note-delete-btn" onClick={() => deleteNote(note.id)}>
                        <Trash size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <button className="win98-button new-note-btn" onClick={() => openWindow("Notepad")}>
                New Note
              </button>
            </div>
            <div className="window-statusbar">
              <div className="statusbar-item">{savedNotes.length} notes</div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="win98-desktop">
      <Background />
      {/* Desktop icons */}
      <div className="win98-desktop-icons">
        {desktopIcons.map((icon, index) => (
          <div key={index} className="win98-desktop-icon" onClick={() => openWindow(icon.name)}>
            <div className="win98-desktop-icon-image">
              {icon.icon}
            </div>
            <div className="win98-desktop-icon-text">{icon.name}</div>
          </div>
        ))}
        <div className="win98-desktop-icon" onClick={() => openWindow("Notes")}>
          <div className="win98-desktop-icon-image">
            <NotebookText size={24} className="win98-icon" />
          </div>
          <div className="win98-desktop-icon-text">My Notes</div>
        </div>
      </div>

      {/* Active window */}
      {activeWindow && (
        <div className="active-window">
          {renderWindowContent()}
        </div>
      )}

      {/* Taskbar */}
      <div className="win98-taskbar">
        <button className={`start-button ${startMenuOpen ? 'active' : ''}`} onClick={toggleStartMenu}>
          <div className="windows-logo">
            <div className="bottom-left"></div>
            <div className="bottom-right"></div>
          </div>
          <span>Start</span>
        </button>
        
        {activeWindow && (
          <div className="taskbar-button">
            <div className="taskbar-button-icon">
              {desktopIcons.find(icon => icon.name === activeWindow)?.icon}
            </div>
            <span>{activeWindow}</span>
          </div>
        )}
        
        <div className="taskbar-time">{formatTime(currentTime)}</div>
      </div>
      
      {/* Start Menu */}
      {startMenuOpen && (
        <div className="start-menu">
          <div className="start-menu-header">
            <div className="windows-logo-large">
              <div className="bottom-left"></div>
              <div className="bottom-right"></div>
            </div>
            <span>Windows98</span>
          </div>
          <div className="start-menu-items">
            <div className="start-menu-item" onClick={() => openWindow("My Computer")}>
              <div className="menu-item-icon computer-icon-small"></div>
              <span>My Computer</span>
            </div>
            <div className="start-menu-item" onClick={() => openWindow("About")}>
              <div className="menu-item-icon"><User size={16} /></div>
              <span>About</span>
            </div>
            <div className="start-menu-item" onClick={() => openWindow("Projects")}>
              <div className="menu-item-icon"><Briefcase size={16} /></div>
              <span>Projects</span>
            </div>
            <div className="start-menu-item" onClick={() => openWindow("Contact")}>
              <div className="menu-item-icon"><Mail size={16} /></div>
              <span>Contact</span>
            </div>
            <div className="start-menu-separator"></div>
            <div className="start-menu-item">
              <div className="menu-item-icon"><Terminal size={16} /></div>
              <span>Run...</span>
            </div>
            <div className="start-menu-item" onClick={() => window.location.reload()}>
              <div className="menu-item-icon"></div>
              <span>Restart...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
