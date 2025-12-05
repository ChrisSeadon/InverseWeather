//should only be called server-side
export async function fetchArticleSummary(article:string){
    const page = encodeURIComponent(article); //handle special chars
    const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxYTY2ZWVkNDhkN2NiZjBiMjhlNWQ1MzBhMDZjYTU2MiIsImp0aSI6IjRkZDdkZTUxNTAyYmVmMDM4ZjMyNWU2YjYzZGQxNzEyMjgxZGQ1NDNiZWM4YTY0OGJiZGI0NjFiNGIxZWU4NjVjZTBiN2Q2MjY1ZTk5ZmY2IiwiaWF0IjoxNzY0OTQ1NTAwLjc3NjEzOSwibmJmIjoxNzY0OTQ1NTAwLjc3NjE0MSwiZXhwIjozMzMyMTg1NDMwMC43NzM4ODQsInN1YiI6IjgxMDEyMTU0IiwiaXNzIjoiaHR0cHM6Ly9tZXRhLndpa2ltZWRpYS5vcmciLCJyYXRlbGltaXQiOnsicmVxdWVzdHNfcGVyX3VuaXQiOjUwMDAsInVuaXQiOiJIT1VSIn0sInNjb3BlcyI6WyJiYXNpYyJdfQ.QyDAM4W841CFBST-CFq0q1eIi5Bfb-GnHhyxh9ifBvvblOnUpvqJOjcF8ZssF-pwY84M9ULe2REfl8ztgyufKP6QX_-V8uyTqRtXnJMXGkUeQxb1rbRhQeECvUWldz0ZK9m0LWMPyMMi4vkTGN5UbCgkVMJCyvSdbyMA0p5YdT5BolPC_aqv7SSEErkkUD1oQlao1NX1hqzipOu992TpyrYcRrPIc11vS73jVopG-0DvemWRcD9Fx6IEYPa6Q3o1MuvHpBomy3i8ieEqeGrDNGHHNmxPVpGtzgeI2E3I9Rqj9Xe4gZTcTUL1j3Rb1L3DahjtADsmKOvzPWzcnP8ocu5SWiAKndRGi5fuM3JW9sxyPLtK3mJcHt0prRAA6wwHuiURzasPBW8IuaXZvzOB3DYHI7XfE64x-qVa12bdOBSkT6wYdKo3fSHFTx35dLAUAa3NL-9jC-Jluj32bVKAbd2aePPsMMOZG42uapa6H4gjV-fqlWMJcWpX6nEXEk9YVRcjS_ei2JCfXeCB7y30-IXjxWUozSdHrmomVhf-HrplcXTZCDDPPZr_XRUINMETeASgzHlLH9rg6Y2kgwYqpBtCFgS_1CkE19RHiJO20u7ywV0j87IPfE9E9n1QrycnLZjZJZTHhADuhOh-FLrAxbwZgucSrL5c8kJtFJAKQaE';
    try{
        const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/Antipodes`, {
            headers: new Headers({
                'Authorization':`Bearer ${accessToken}`,
                'Api-User-Agent':'INVERSE_WEATHER',
                Accept: 'application/json'
            })
        });

        if (!response.ok){
            throw new Error(`Failed to retrieve article, status ${response.status}`);
        }
        
        return await response.json();

    }catch(error){
        console.error(error);
        throw error;
    }
}