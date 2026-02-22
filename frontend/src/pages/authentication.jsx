import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar, Alert } from '@mui/material';

export default function Authentication() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [error, setError] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [formState, setFormState] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    let handleAuth = async () => {
        setLoading(true);
        try {
            if (formState === 0) {
                await handleLogin(username, password);
            }
            if (formState === 1) {
                let result = await handleRegister(name, username, password);
                setUsername('');
                setPassword('');
                setMessage(result);
                setOpen(true);
                setError('');
                setFormState(0);
            }
        } catch (err) {
            let msg = err?.response?.data?.message || 'Something went wrong.';
            setError(msg);
        } finally {
            setLoading(false);
        }
    }

    const inputSx = {
        '& .MuiOutlinedInput-root': {
            color: '#f0f2ff',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.95rem',
            background: 'rgba(255,255,255,0.04)',
            borderRadius: '12px',
            '& fieldset': { borderColor: 'rgba(255,255,255,0.12)' },
            '&:hover fieldset': { borderColor: 'rgba(108,99,255,0.5)' },
            '&.Mui-focused fieldset': { borderColor: '#6c63ff', borderWidth: '1.5px' },
        },
        '& .MuiInputLabel-root': {
            color: '#8892b0',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.9rem',
        },
        '& .MuiInputLabel-root.Mui-focused': { color: '#8b85ff' },
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--bg-primary)',
            display: 'flex',
            fontFamily: 'Inter, sans-serif',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Background blobs */}
            <div style={{
                position: 'fixed', top: '-15%', left: '-8%',
                width: 600, height: 600,
                background: 'radial-gradient(circle, rgba(108,99,255,0.18) 0%, transparent 70%)',
                borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0,
            }} />
            <div style={{
                position: 'fixed', bottom: '-20%', right: '-10%',
                width: 700, height: 700,
                background: 'radial-gradient(circle, rgba(255,107,157,0.12) 0%, transparent 70%)',
                borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0,
            }} />

            {/* Left decorative panel */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '3rem',
                position: 'relative',
                zIndex: 1,
            }}>
                <div style={{ maxWidth: 460, textAlign: 'center' }}>
                    <div style={{
                        width: 80, height: 80,
                        background: 'linear-gradient(135deg, #6c63ff, #ff6b9d)',
                        borderRadius: '24px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 2rem',
                        boxShadow: '0 0 40px rgba(108,99,255,0.5)',
                    }}>
                        <VideoCallIcon sx={{ fontSize: 40, color: 'white' }} />
                    </div>

                    <h1 style={{
                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                        fontWeight: 800,
                        color: '#f0f2ff',
                        lineHeight: 1.2,
                        letterSpacing: '-1.5px',
                        marginBottom: '1rem',
                    }}>
                        Premium video<br />
                        <span style={{
                            background: 'linear-gradient(135deg, #6c63ff, #ff6b9d)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>
                            at your fingertips.
                        </span>
                    </h1>

                    <p style={{ color: '#8892b0', fontSize: '1rem', lineHeight: 1.7 }}>
                        Connect with anyone, from anywhere.<br />
                        Crystal clear. Instant. Secure.
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap' }}>
                        {['🔒 Encrypted', '⚡ Zero Lag', '🌍 Global', '🎥 HD Video'].map((f, i) => (
                            <span key={i} style={{
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '50px',
                                padding: '6px 14px',
                                fontSize: '0.8rem',
                                color: '#8892b0',
                                fontWeight: 500,
                            }}>{f}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div style={{ width: '1px', background: 'rgba(255,255,255,0.06)', margin: '4rem 0', position: 'relative', zIndex: 1 }} />

            {/* Right Auth Panel */}
            <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3rem 4rem',
                position: 'relative',
                zIndex: 1,
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: 420,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '28px',
                    padding: '2.5rem',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
                }}>
                    {/* Avatar icon */}
                    <div style={{
                        width: 56, height: 56,
                        background: formState === 0
                            ? 'linear-gradient(135deg, #6c63ff, #8b85ff)'
                            : 'linear-gradient(135deg, #ff6b9d, #ff8fa3)',
                        borderRadius: '18px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        marginBottom: '1.5rem',
                        boxShadow: formState === 0 ? '0 0 30px rgba(108,99,255,0.5)' : '0 0 30px rgba(255,107,157,0.4)',
                        transition: 'all 0.3s ease',
                    }}>
                        {formState === 0
                            ? <LockOutlinedIcon sx={{ color: 'white', fontSize: 28 }} />
                            : <PersonAddIcon sx={{ color: 'white', fontSize: 28 }} />
                        }
                    </div>

                    <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#f0f2ff', marginBottom: '0.4rem', letterSpacing: '-0.5px' }}>
                        {formState === 0 ? 'Welcome back' : 'Create account'}
                    </h2>
                    <p style={{ color: '#8892b0', fontSize: '0.88rem', marginBottom: '2rem' }}>
                        {formState === 0 ? 'Sign in to continue to NexMeet' : 'Join thousands of users today'}
                    </p>

                    {/* Toggle Tabs */}
                    <div style={{
                        display: 'flex',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '12px',
                        padding: '4px',
                        marginBottom: '1.8rem',
                        gap: '4px',
                    }}>
                        {['Sign In', 'Sign Up'].map((label, i) => (
                            <button
                                key={i}
                                onClick={() => { setFormState(i); setError(''); }}
                                style={{
                                    flex: 1,
                                    padding: '0.6rem',
                                    border: 'none',
                                    borderRadius: '9px',
                                    fontFamily: 'Inter, sans-serif',
                                    fontWeight: 600,
                                    fontSize: '0.88rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.25s ease',
                                    background: formState === i
                                        ? 'linear-gradient(135deg, #6c63ff, #ff6b9d)'
                                        : 'transparent',
                                    color: formState === i ? 'white' : '#8892b0',
                                    boxShadow: formState === i ? '0 4px 15px rgba(108,99,255,0.35)' : 'none',
                                }}
                            >{label}</button>
                        ))}
                    </div>

                    <Box component="form" noValidate sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {formState === 1 && (
                            <TextField
                                required fullWidth
                                label="Full Name"
                                value={name}
                                autoFocus
                                onChange={(e) => setName(e.target.value)}
                                sx={inputSx}
                            />
                        )}
                        <TextField
                            required fullWidth
                            label="Username"
                            value={username}
                            autoFocus={formState === 0}
                            onChange={(e) => setUsername(e.target.value)}
                            sx={inputSx}
                        />
                        <TextField
                            required fullWidth
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={inputSx}
                        />

                        {error && (
                            <div style={{
                                background: 'rgba(255, 107, 107, 0.1)',
                                border: '1px solid rgba(255, 107, 107, 0.3)',
                                borderRadius: '10px',
                                padding: '10px 14px',
                                color: '#ff7b7b',
                                fontSize: '0.83rem',
                                fontWeight: 500,
                            }}>
                                ⚠️ {error}
                            </div>
                        )}

                        <button
                            type="button"
                            onClick={handleAuth}
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '0.9rem',
                                marginTop: '0.5rem',
                                border: 'none',
                                borderRadius: '14px',
                                background: 'linear-gradient(135deg, #6c63ff, #ff6b9d)',
                                color: 'white',
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 700,
                                fontSize: '1rem',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                opacity: loading ? 0.7 : 1,
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s',
                                boxShadow: '0 6px 25px rgba(108,99,255,0.45)',
                                letterSpacing: '0.3px',
                            }}
                            onMouseEnter={e => { if (!loading) { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 12px 35px rgba(108,99,255,0.55)'; } }}
                            onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 6px 25px rgba(108,99,255,0.45)'; }}
                        >
                            {loading ? '...' : (formState === 0 ? 'Sign In →' : 'Create Account →')}
                        </button>
                    </Box>
                </div>
            </div>

            <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert severity="success" onClose={() => setOpen(false)}
                    sx={{ background: 'rgba(0,212,170,0.15)', color: '#00d4aa', border: '1px solid rgba(0,212,170,0.3)', fontFamily: 'Inter' }}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}