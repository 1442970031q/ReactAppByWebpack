import { FC } from 'react'
const TestChild: FC<{
    name: string
}> = ({ name }) => {
    return <h1>
        {name}
    </h1>
}

export default TestChild