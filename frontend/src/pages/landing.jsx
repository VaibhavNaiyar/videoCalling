import React from 'react'
import "../App.css"
import { Link, useNavigate } from 'react-router-dom'

export default function LandingPage() {
    const router = useNavigate();

    return (
        <div className='landingPageContainer'>
            <nav>
                <div className='navHeader'>
                    <h2>⚡ NexMeet</h2>
                </div>
                <div className='navlist'>
                    <p onClick={() => router("/aljk23")}>Join as Guest</p>
                    <p onClick={() => router("/auth")}>Register</p>
                    <div onClick={() => router("/auth")} role='button'>
                        <p>Login</p>
                    </div>
                </div>
            </nav>

            <div className="landingMainContainer">
                <div>
                    <div className="hero-badges">
                        <span className="hero-badge">
                            <span className="hero-badge-dot"></span>
                            HD Video Quality
                        </span>
                        <span className="hero-badge">
                            <span className="hero-badge-dot" style={{ background: '#ff6b9d', boxShadow: '0 0 8px #ff6b9d' }}></span>
                            End-to-End Encrypted
                        </span>
                        <span className="hero-badge">
                            <span className="hero-badge-dot" style={{ background: '#6c63ff', boxShadow: '0 0 8px #6c63ff' }}></span>
                            Zero Lag
                        </span>
                    </div>

                    <h1>
                        <span className="hero-accent">Connect</span> with<br />
                        your loved ones<br />instantly.
                    </h1>

                    <p>Experience crystal-clear video calls with no delays.<br />Bridge every distance — one click away.</p>

                    <div role='button'>
                        <Link to={"/auth"}>Get Started Free →</Link>
                    </div>

                    <div className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-value">10M+</span>
                            <span className="stat-label">Active Users</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">99.9%</span>
                            <span className="stat-label">Uptime</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">150+</span>
                            <span className="stat-label">Countries</span>
                        </div>
                    </div>
                </div>

                <div>
                    <img src="/mobile.png" alt="App preview" />
                </div>
            </div>
        </div>
    )
}
