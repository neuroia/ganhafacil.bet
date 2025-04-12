import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Supabase configuration (you'll replace this with your Supabase details)
const supabaseUrl = "https://your-supabase-url.supabase.co";
const supabaseKey = "your-supabase-public-key";
const supabase = createClient(supabaseUrl, supabaseKey);

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [session, setSession] = useState(null);

  const login = async () => {
    const { user, error } = await supabase.auth.signIn({
      email,
      password,
    });
    if (error) alert(error.message);
    setSession(user);
  };

  const signup = async () => {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) alert(error.message);
    setSession(user);
  };

  return (
    <div>
      <h1>Ganhafacil.bet - Login</h1>
      {!session ? (
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button onClick={login}>Login</button>
          <button onClick={signup}>Sign Up</button>
        </div>
      ) : (
        <div>
          <h2>Welcome {session.email}</h2>
          <button onClick={() => supabase.auth.signOut()}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default App;