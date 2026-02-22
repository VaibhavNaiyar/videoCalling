import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import VideocamIcon from '@mui/icons-material/Videocam';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { IconButton } from '@mui/material';

export default function History() {
    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([]);
    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch { }
        }
        fetchHistory();
    }, []);

    let formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--bg-primary)',
            fontFamily: 'Inter, sans-serif',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Background blobs */}
            <div style={{
                position: 'fixed', top: '-10%', right: '-5%', width: 500, height: 500,
                background: 'radial-gradient(circle, rgba(108,99,255,0.15) 0%, transparent 70%)',
                borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0,
            }} />

            {/* Header */}
            <div style={{
                padding: '1.2rem 2.5rem',
                background: 'rgba(10, 14, 26, 0.8)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'sticky', top: 0, zIndex: 100,
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <IconButton
                        onClick={() => routeTo("/home")}
                        sx={{
                            color: '#8892b0',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '12px',
                            '&:hover': { background: 'rgba(108,99,255,0.15)', color: '#f0f2ff', borderColor: 'rgba(108,99,255,0.4)' },
                            transition: 'all 0.2s',
                        }}
                    >
                        <HomeIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                    <div>
                        <h2 style={{
                            fontSize: '1.4rem', fontWeight: 700, letterSpacing: '-0.5px',
                            background: 'linear-gradient(135deg, #6c63ff, #ff6b9d)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                        }}>Meeting History</h2>
                        <p style={{ color: '#8892b0', fontSize: '0.78rem', marginTop: '1px' }}>
                            {meetings.length} meeting{meetings.length !== 1 ? 's' : ''} recorded
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div style={{
                padding: '3rem 2.5rem',
                maxWidth: 900,
                margin: '0 auto',
                position: 'relative', zIndex: 1,
            }}>
                {meetings.length === 0 ? (
                    <div style={{
                        textAlign: 'center', padding: '5rem 2rem',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        borderRadius: '24px', backdropFilter: 'blur(10px)',
                    }}>
                        <div style={{
                            width: 72, height: 72,
                            background: 'linear-gradient(135deg, rgba(108,99,255,0.2), rgba(255,107,157,0.1))',
                            border: '1px solid rgba(108,99,255,0.3)',
                            borderRadius: '20px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto 1.5rem',
                        }}>
                            <VideocamIcon sx={{ fontSize: 32, color: '#6c63ff' }} />
                        </div>
                        <h3 style={{ color: '#f0f2ff', fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>No meetings yet</h3>
                        <p style={{ color: '#8892b0', fontSize: '0.9rem' }}>Your meeting history will appear here</p>
                        <button
                            onClick={() => routeTo('/home')}
                            style={{
                                marginTop: '1.5rem',
                                background: 'linear-gradient(135deg, #6c63ff, #ff6b9d)',
                                border: 'none', color: 'white',
                                padding: '0.7rem 1.8rem',
                                borderRadius: '50px',
                                fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.9rem',
                                cursor: 'pointer', boxShadow: '0 6px 20px rgba(108,99,255,0.4)',
                            }}
                        >
                            Start a Meeting
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                        {meetings.map((e, i) => (
                            <div
                                key={i}
                                style={{
                                    background: 'rgba(255,255,255,0.04)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    borderRadius: '20px',
                                    padding: '1.5rem',
                                    backdropFilter: 'blur(10px)',
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                                    animation: `fadeInUp 0.4s ease ${i * 0.05}s both`,
                                }}
                                onMouseEnter={el => {
                                    el.currentTarget.style.transform = 'translateY(-4px)';
                                    el.currentTarget.style.boxShadow = '0 16px 40px rgba(108,99,255,0.25)';
                                    el.currentTarget.style.borderColor = 'rgba(108,99,255,0.35)';
                                }}
                                onMouseLeave={el => {
                                    el.currentTarget.style.transform = 'translateY(0)';
                                    el.currentTarget.style.boxShadow = 'none';
                                    el.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                                }}
                            >
                                <div style={{
                                    width: 44, height: 44,
                                    background: 'linear-gradient(135deg, rgba(108,99,255,0.25), rgba(255,107,157,0.15))',
                                    border: '1px solid rgba(108,99,255,0.3)',
                                    borderRadius: '14px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    marginBottom: '1rem',
                                }}>
                                    <VideocamIcon sx={{ fontSize: 22, color: '#8b85ff' }} />
                                </div>

                                <p style={{ color: '#8892b0', fontSize: '0.73rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '4px' }}>
                                    Meeting Code
                                </p>
                                <p style={{
                                    color: '#f0f2ff', fontWeight: 700, fontSize: '1.05rem',
                                    fontFamily: 'monospace', letterSpacing: '1px', marginBottom: '1rem',
                                    background: 'linear-gradient(135deg, #8b85ff, #ff6b9d)',
                                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                                }}>
                                    {e.meetingCode}
                                </p>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4a5568', fontSize: '0.82rem' }}>
                                    <CalendarTodayIcon sx={{ fontSize: 14 }} />
                                    <span style={{ color: '#8892b0' }}>{formatDate(e.date)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
