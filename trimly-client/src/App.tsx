import { Button as ShadButton } from "./components/ui/button"
import Button from '@mui/material/Button';

function App() {
  return (
    <>
    <ShadButton>Click me</ShadButton>
    <Button variant="outlined">Click me</Button>
      <h1 className='text-3xl font-bold underline text-red-500'>Welcome to Trimly</h1>
    </>
  )
}

export default App
