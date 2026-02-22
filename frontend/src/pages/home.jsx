import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import "../App.css";
import { IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {
    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const { addToUserHistory } = useContext(AuthContext);

    let handleJoinVideoCall = async () => {
        await addToUserHistory(meetingCode);
        navigate(`/${meetingCode}`);
    }

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            {/* Navbar */}
            <div className="navBar">
                <div style={{ display: "flex", alignItems: "center", gap: '10px' }}>
                    <span style={{ fontSize: '1.5rem' }}>⚡</span>
                    <h2>NexMeet</h2>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: '8px' }}>
                    <IconButton
                        onClick={() => navigate("/history")}
                        sx={{
                            color: 'rgba(136, 146, 176, 0.9)',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '12px',
                            padding: '8px 14px',
                            gap: '6px',
                            fontSize: '0.85rem',
                            fontFamily: 'Inter, sans-serif',
                            '&:hover': {
                                background: 'rgba(108,99,255,0.15)',
                                color: '#f0f2ff',
                                borderColor: 'rgba(108,99,255,0.5)',
                            },
                            transition: 'all 0.2s ease',
                        }}
                    >
                        <RestoreIcon sx={{ fontSize: 18 }} />
                        <span style={{ fontSize: '0.85rem', fontWeight: 500, marginLeft: '4px' }}>History</span>
                    </IconButton>

                    <IconButton
                        onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/auth");
                        }}
                        sx={{
                            color: '#ff6b9d',
                            background: 'rgba(255, 107, 157, 0.08)',
                            border: '1px solid rgba(255, 107, 157, 0.2)',
                            borderRadius: '12px',
                            padding: '8px 16px',
                            gap: '6px',
                            fontSize: '0.85rem',
                            fontFamily: 'Inter, sans-serif',
                            '&:hover': {
                                background: 'rgba(255, 107, 157, 0.18)',
                                borderColor: 'rgba(255, 107, 157, 0.5)',
                            },
                            transition: 'all 0.2s ease',
                        }}
                    >
                        <LogoutIcon sx={{ fontSize: 18 }} />
                        <span style={{ fontSize: '0.85rem', fontWeight: 500, marginLeft: '4px' }}>Logout</span>
                    </IconButton>
                </div>
            </div>

            {/* Main Content */}
            <div className="meetContainer">
                <div className="leftPanel">
                    <div>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                            background: 'rgba(108, 99, 255, 0.12)',
                            border: '1px solid rgba(108, 99, 255, 0.3)',
                            borderRadius: '50px', padding: '6px 16px',
                            marginBottom: '1.5rem',
                            fontSize: '0.8rem', color: '#8b85ff', fontWeight: 600,
                        }}>
                            <VideoCallIcon sx={{ fontSize: 16 }} />
                            Instant Video Conferencing
                        </div>

                        <h2>
                            Start or join a<br />
                            <span>meeting in seconds.</span>
                        </h2>

                        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                            Enter your meeting code below and connect with<br />your team anywhere, anytime.
                        </p>

                        <div className="meet-input-row">
                            <TextField
                                onChange={e => setMeetingCode(e.target.value)}
                                value={meetingCode}
                                placeholder="Enter meeting code..."
                                variant="standard"
                                fullWidth
                                InputProps={{ disableUnderline: true }}
                                sx={{
                                    '& input': {
                                        color: 'var(--text-primary)',
                                        fontSize: '0.95rem',
                                        fontFamily: 'Inter, sans-serif',
                                        '&::placeholder': { color: 'var(--text-muted)' },
                                    },
                                }}
                            />
                            <button
                                onClick={handleJoinVideoCall}
                                style={{
                                    background: 'linear-gradient(135deg, #6c63ff, #ff6b9d)',
                                    border: 'none',
                                    color: 'white',
                                    padding: '0.75rem 1.6rem',
                                    borderRadius: '12px',
                                    fontFamily: 'Inter, sans-serif',
                                    fontWeight: 600,
                                    fontSize: '0.9rem',
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                    boxShadow: '0 4px 20px rgba(108, 99, 255, 0.4)',
                                }}
                                onMouseEnter={e => {
                                    e.target.style.transform = 'translateY(-1px)';
                                    e.target.style.boxShadow = '0 8px 30px rgba(108, 99, 255, 0.55)';
                                }}
                                onMouseLeave={e => {
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = '0 4px 20px rgba(108, 99, 255, 0.4)';
                                }}
                            >
                                Join Now
                            </button>
                        </div>

                        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.8rem' }}>
                            {[
                                { icon: '🔒', text: 'Encrypted' },
                                { icon: '⚡', text: 'Zero Lag' },
                                { icon: '🌐', text: 'Any Device' },
                            ].map((f, i) => (
                                <div key={i} style={{
                                    display: 'flex', alignItems: 'center', gap: '6px',
                                    color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 500,
                                }}>
                                    <span>{f.icon}</span> {f.text}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='rightPanel'>
                    <img srcSet='/logo3.png' alt="Video call illustration" />
                </div>
            </div>
        </div>
    )
}

export default withAuth(HomeComponent)