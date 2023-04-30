import {useState, useEffect} from 'react'
import {
    Button,
    useToast,
    ButtonGroup,
    Center,
    Box,
    Heading,
    Container
} from '@chakra-ui/react'
import {TimeIcon} from '@chakra-ui/icons'


function App() {
    const [count, setCount] = useState(0)
    const toast = useToast()
    const [secondsLeft, setSeconds] = useState(0);
    const [minutesLeft, setMinutes] = useState(0);
    const [totalSeconds, setTotalSeconds] = useState(0);

    const timerData = {
        vs: 3,
        s: 5,
        l: 25
    }
    const initialState = {
        vs: false,
        s: false,
        l: false
    }

    useEffect(() => {
        if (count === 0) {
            setCount((prev)=>prev+1);
        }
        setMinutes(Math.floor(totalSeconds / 60))
        setSeconds(totalSeconds % 60)
        const interval = setInterval(() => {
            console.log(totalSeconds);
            setTotalSeconds((prevTotalSeconds) => prevTotalSeconds - 1);

        }, 1000);
        if (totalSeconds < 1) {
            clearInterval(interval)
            if (count > 1) {
                toast({title: "Time's up 🥳🥳", status: 'info', duration: 3000, isClosable: true})
            }
            console.log('Countdown finished!');
        }
        return() => {
            clearInterval(interval)
        }
    }, [totalSeconds]);

    function countdown(minutes) {

        setTotalSeconds(minutes * 60)

        return() => clearInteraval(interval)
    }

    const [bttnStatus, setBtnStatus] = useState(initialState)
    const handleClick = (btn) => {
        countdown(0)
        setMinutes(timerData[btn])

        setBtnStatus((prev) => ({
            ... initialState,
            [btn]: !prev.btn
        }))

    }
    const startTimer = () => {
        countdown(minutesLeft)

    }
    return (
        <>
            <Container>
                <ButtonGroup size='sm' variant='ghost' spacing='2'
                    margin={'50px 0'}>
                    <Button size='sm'
                        isActive={
                            bttnStatus.vs
                        }
                        onClick={
                            () => {
                                handleClick("vs")
                            }
                        }
                        colorScheme='blue'>Very Short Break</Button>
                    <Button size='sm'
                        isActive={
                            bttnStatus.s
                        }
                        onClick={
                            () => {
                                handleClick('s')
                            }
                        }
                        colorScheme='blue'>Short Break</Button>
                    <Button size='sm'
                        isActive={
                            bttnStatus.l
                        }
                        onClick={
                            () => handleClick('l')
                        }
                        colorScheme='blue'>Long Break</Button>
                </ButtonGroup>
                <Box h='100px'>
                    <Center m={10}
                        height='0'
                        p='4'
                        color='white'
                        axis='both'>
                        <Heading id="heading" bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text" fontSize="6xl" fontWeight="extrabold">
                            {
                            minutesLeft < 10 ? '0' + minutesLeft : minutesLeft
                        }:{
                            secondsLeft < 10 ? '0' + secondsLeft : secondsLeft
                        }</Heading>
                    </Center>
                </Box>
                <Button isDisabled={totalSeconds}
                    colorScheme={"messenger"}
                    onClick={startTimer}
                    rightIcon={<TimeIcon/>}>Start
                </Button>
            </Container>
        </>
    )
}

export default App
