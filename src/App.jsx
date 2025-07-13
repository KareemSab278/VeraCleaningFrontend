import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/VeraCleaningFrontend/" element={<Home />} />
        <Route path="/VeraCleaningFrontend/signin" element={<SignIn />} />
        <Route
          path="/VeraCleaningFrontend/jobs"
          element={
            <PrivateRoute>
              <Jobs />
            </PrivateRoute>
          }
        />
        <Route
          path="/VeraCleaningFrontend/employees"
          element={
            <PrivateRoute>
              <Employees />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Home />} />
        <Route path="/VeraCleaningFrontend/signout" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
