import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";

// const Login: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     // Simulate user data (in real case, fetch from API)
//     const userData = { id: "123", name: "John Doe", email };

//     // Authenticate user
//     login(userData);

//     // Redirect to dashboard
//     navigate("/dashboard");
//   };

//   return (
//     <div style={{padding: '200px'}}>
//       <h2>Login</h2>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };

const Login: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
  
    const handleLogin = (values: { email: string; password: string }) => {
      const { email } = values;
  
      // Simulate authentication
      const userData = { id: "123", name: "John Doe", email };
      login(userData);
      
      message.success("Login successful!");
      navigate("/dashboard");
    };
  
    return (
      <div style={{ maxWidth: 400, margin: "50px auto", padding: 20, border: "1px solid #ddd", borderRadius: 8 }}>
        <h2 style={{ textAlign: "center" }}>Login</h2>
        <Form
          name="login"
          onFinish={handleLogin}
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Invalid email format!" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
  
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter your password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
  
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  };

export default Login;
