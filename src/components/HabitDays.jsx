import styled from "styled-components";

export default function HabitDays({ activeDays, setNewDays, loading }) {
    const dayLetter = ["D", "S", "T", "Q", "Q", "S", "S"];

    function selectDayFunc(day) {
        if (activeDays.includes(day)) {
            setNewDays(activeDays.filter((id) => id !== day));
        } else {
            setNewDays([...activeDays, day]);
        }
    }


    return (
        <HabitsDays>
            {[0, 1, 2, 3, 4, 5, 6].map((index) => (
                <Day
                    key={index}
                    active={activeDays.includes(index)}
                    onClick={() => setNewDays && selectDayFunc(index)}
                    data-test="habit-day"
                    disabled={loading}
                >
                    {dayLetter[index]}
                </Day>
            ))}
        </HabitsDays>
    );
}


const HabitsDays = styled.div`
    display: flex;
    gap: 4px;
`;

const Day = styled.div`
    width: 28px;
    height: 28px;
    color: ${(props) => (props.active ? "#ffffff" : "#d4d4d4")};
    background-color: ${(props) => (props.active ? "#cfcfcf" : "#ffffff")};
    border: 1px solid ${(props) => (props.active ? "#cfcfcf" : "#d4d4d4")};
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
`;
