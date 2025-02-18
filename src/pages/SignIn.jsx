const SignIn =()=>{
    return (
        <div className="signin">
            <h2>Sign In</h2>
            <form>
                <input type="username" placeholder="username"/><br />
                <input type="password" placeholder="password"/><br />
                <button type="submit">Sign In</button>
            </form>
        </div>
    )
}

export default SignIn;