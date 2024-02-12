import dayjs from 'dayjs';
export default defineNuxtPlugin(() => {
    const time = dayjs();
    const hour = time.hour();
    let timeOfDay;

    return {
        provide: {
            dayTime: () => {
                if (hour >= 5 && hour < 12) {
                    timeOfDay = 'morning';
                } else if (hour >= 12 && hour < 18) {
                    timeOfDay = 'afternoon';
                } else if (hour >= 18 && hour < 22) {
                    timeOfDay = 'evening';
                } else {
                    timeOfDay = 'night';
                }
                return timeOfDay;
            }
        }
    }
})