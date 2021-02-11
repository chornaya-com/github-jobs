import React from "react";
import {useFetchJobs} from "./useFetchJobs";
import {Container} from "react-bootstrap";
import {Job} from "./components/job/Job";
import {JobsPagination} from "./components/pagination/JobsPagination";

function App() {
    const [params, setParams] = React.useState({});
    const [page, setPage] = React.useState(1);
    const {jobs, loading, error, hasNextPage} = useFetchJobs(params, page);

  return (
    <Container className="my-4">
        <h1 className="mb-4">GitHub Jobs</h1>
        <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage}/>
        {loading && <h1>Loading...</h1>}
        {error && <h1>Error. Refresh the page.</h1>}
        {jobs.map(job => {
            return <Job key={job.id} job={job}/>
        })}
        <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage}/>
    </Container>
  );
}

export default App;
