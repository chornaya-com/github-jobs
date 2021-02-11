import React from "react";
import {useFetchJobs} from "./useFetchJobs";
import {Container} from "react-bootstrap";
import {Job} from "./components/job/Job";

function App() {
    const [params, setParams] = React.useState({});
    const [page, setPage] = React.useState({});
    const {jobs, loading, error} = useFetchJobs(params, page);

  return (
    <Container className="my-4">
        {loading && <h1>Loading...</h1>}
        {error && <h1>Error. Refresh the page.</h1>}
        {jobs.map(job => {
            return <Job key={job.id} job={job}/>
        })}
    </Container>
  );
}

export default App;
