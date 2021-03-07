import React from "react";
import {useFetchJobs} from "./useFetchJobs";
import {Container} from "react-bootstrap";
import {Job} from "./components/job/Job";
import {JobsPagination} from "./components/pagination/JobsPagination";
import {SearchForm} from "./components/searchForm/SearchForm";

function App() {
    const [params, setParams] = React.useState({description: '', location: ''});
    const [page, setPage] = React.useState(1);
    const {jobs, loading, error, hasNextPage} = useFetchJobs(params, page);

    function handleParamChange(event) {
        const param = event.target.name;
        const value = event.target.value;

        setPage(1);
        setParams(prevParams => {
            return {...prevParams, [param]:value}
        })
    }

  return (
    <Container className="my-4">
        <h1 className="mb-4">GitHub Jobs</h1>
        <SearchForm params={params} onParamChange={handleParamChange}/>
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
