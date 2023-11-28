function CountDownTimer(
    durationInMilliSecond,
    onRemaining,
    onFinish = {},
    stepInMillieSecond = 995,
) {
    console.log('CountDownTimer');
    const startTime = new Date().getTime();
    const intervalId = setInterval(callOnRemaining, stepInMillieSecond);

    onRemaining(durationInMilliSecond - stepInMillieSecond)

    function callOnRemaining() {
        const pastTime = new Date().getTime() - startTime
        const remainingTime =  durationInMilliSecond - pastTime

        onRemaining(Math.max(remainingTime, 0))

        if (remainingTime <= 0) {
            onFinish()
            clearInterval(intervalId)
        }
    }
}

export default CountDownTimer;