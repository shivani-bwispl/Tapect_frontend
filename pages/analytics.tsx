/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-children-prop */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../store';
import dynamic from 'next/dynamic';
import Dropdown from '../components/Dropdown';
import axiosInstance from '../services/api'; // Import axiosInstance from api.js
import router from 'next/dist/client/router';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});
const analytics = () => {
    const [selectedOption, setSelectedOption] = useState('Daily Tapect');
    const options = ['Daily Tapect', 'Regional Wise', 'Contact Share', 'Date Wise'];

    const [chartVisibility, setChartVisibility] = useState({
        'Daily Tapect': true,
        'Regional Wise': false,
        'Contact Share': false,
        'Date Wise': false,
    });
    const [loginHistory, setLoginHistory] = useState([]); // State to store login history data
    const [ContactShareHistory, setContactShareHistory] = useState([]); // State to store login history data


    const handleSelect = (selectedOption) => {
        console.log('Selected option:', selectedOption);

        // Set visibility for the selected chart to true and hide the rest
        setChartVisibility({
            'Daily Tapect': selectedOption === 'Daily Tapect',
            'Regional Wise': selectedOption === 'Regional Wise',
            'Contact Share': selectedOption === 'Contact Share',
            'Date Wise': selectedOption === 'Date Wise',
        });
        setSelectedOption(selectedOption);

        // Add your logic here to handle the selected option
    };

    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

          
 // Fetch login history data
 useEffect(() => {
    fetchLoginHistory();
    fetchContactShareCount();
}, []);


    // columnChartOptions
    const columnChart = {
        series: [
            {
                name: 'Net Profit',
                data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
            },
            {
                name: 'Revenue',
                data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
            },
        ],
        options: {
            chart: {
                height: 300,
                type: 'line',
                zoom: {
                    enabled: false,
                },
                toolline: {
                    show: false,
                },
            },
            colors: ['#805DCA', '#E7515A'],
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent'],
            },
            plotOptions: {
                line: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded',
                },
            },
            grid: {
                borderColor: isDark ? '#191E3A' : '#E0E6ED',
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                axisBorder: {
                    color: isDark ? '#191E3A' : '#E0E6ED',
                },
            },
            yaxis: {
                opposite: isRtl ? true : false,
                labels: {
                    offsetX: isRtl ? -10 : 0,
                },
            },
            tooltip: {
                theme: isDark ? 'dark' : 'light',
                y: {
                    formatter: function (val: any) {
                        return val;
                    },
                },
            },
        },
    };


    const fetchLoginHistory = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                throw new Error('User ID not found in localStorage');
            }
            const auth = localStorage.getItem('token');


            if (!auth || auth === "null") {
                // Display error message
                console.error('Token not found in localStorage');
                // Redirect to login page
                router.push('/Login');
                return;
            }

            const config = {
                headers: {
                    'Authorization': `Bearer ${auth}`, // Set the authorization header properly
                },
            };
            const response = await axiosInstance.get(`/login/login-history/${userId}`, config);
            const loginHistoryData = response.data.loginHistory;
            setLoginHistory(loginHistoryData);
        } catch (error) {
            console.error('Error fetching login history:', error.message);
        }
    };

    // CONTACT SHARE API 
    const fetchContactShareCount = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                throw new Error('User ID not found in localStorage');
            }

            const response = await axiosInstance.get(`/analytics/contactshare/${userId}`)
                // Log the response data
                // const ContactShareCount = response.data;
                const { shareCount } = response.data;

                // Update state with the share count
                setContactShareHistory([{ count: shareCount, date: new Date().toISOString() }]);
           
            // setContactShareHistory(ContactShareCount);


        } catch (error) {
            console.error('Error fetching Contact Share history:', error.message);

        }
    }


 

    // Filter login history data for "Daily Tapect" and "Date Wise" charts
    const filteredLoginHistory = loginHistory.filter((item) => {
        return selectedOption === 'Daily Tapect' || selectedOption === 'Date Wise' || selectedOption === 'Regional Wise' || selectedOption === 'Contact Share';
    });


    // Filter contact share data for "Contact Share" chart
const filteredContactHistory = ContactShareHistory.filter((item) => {
    return selectedOption === 'Contact Share';
});

    
     

    const renderChart = () => {
        switch (selectedOption) {
            case 'Daily Tapect':
                return (
                    <ReactApexChart
                        series={[
                            {
                                name: 'Daily Tapect',
                                data: filteredLoginHistory.map((item) => item?.count ?? 0), // Add null check and fallback to 0
                            },
                        ]}
                        options={{
                            chart: {
                                type: 'line',
                            },
                            xaxis: {
                                type: 'datetime', // set x-axis type to datetime
                                categories: filteredLoginHistory.map((item) => item?.date ?? ''), // Assuming date is in a valid format
                                labels: {
                                    format: 'dd/MM/yy', // set the format for x-axis labels
                                }, // Add null check and fallback to empty string
                            },
                            markers: {
                                size: 5, // Size of the markers
                                shape: 'circle', // Shape of the markers
                            },
                            colors: ['#652dbf'], // Add your desired color for Daily Tapect
                            // Other options as needed
                        }}
                        className="w-full rounded-lg bg-white dark:bg-black text-primary"
                        type="line"
                        height={500}
                        width={'100%'}
                    />
                );
            case 'Date Wise':
                return (
                    <ReactApexChart
                        series={[
                            {
                                name: 'Date Wise',
                                data: filteredLoginHistory.map((item) => item?.count ?? 0), // Add null check and fallback to 0
                            },
                        ]}
                        options={{
                            chart: {
                                type: 'line',
                            },
                            xaxis: {
                                type: 'datetime', // set x-axis type to datetime
                                categories: filteredLoginHistory.map((item) => item?.date ?? ''), // Assuming date is in a valid format
                                labels: {
                                    format: 'MM/dd/yy', // set the format for x-axis labels
                                },
                            },
                            markers: {
                                size: 5, // Size of the markers
                                shape: 'circle', // Shape of the markers
                            },
                            colors: ['#652dbf'], // Add your desired color for Date Wise
                            // Other options as needed
                        }}
                        className="w-full rounded-lg bg-white dark:bg-black"
                        type="line"
                        height={500}
                        width={'100%'}
                    />
                );
            case 'Regional Wise':
                return (
                    <ReactApexChart
                        series={[
                            {
                                name: 'Regional Wise',
                                data: filteredLoginHistory.map((item) => item?.count ?? 0), // Add null check and fallback to 0
                            },
                        ]}
                        options={{
                            chart: {
                                type: 'line',
                            },
                            xaxis: {
                                categories: filteredLoginHistory.map((item) => item?.date ?? ''), // Add null check and fallback to empty string
                            },
                            markers: {
                                size: 5, // Size of the markers
                                shape: 'circle', // Shape of the markers
                            },
                            colors: ['#652dbf'], // Add your desired color for Regional Wise
                            // Other options as needed
                        }}
                        className="w-full rounded-lg bg-white dark:bg-black"
                        type="line"
                        height={500}
                        width={'100%'}
                    />
                );
            case 'Contact Share':
                return (
                    <ReactApexChart
                        series={[
                            {
                                name: 'Contact Share',
                                data: filteredContactHistory.map((item) => item?.count ?? 1),
                            },
                        ]}
                        options={{
                            chart: {
                                type: 'line',
                            },
                            xaxis: {
                                categories: filteredContactHistory.map((item) => item?.date ?? ''),
                            },
                            colors: ['#FF33A1'], // Add your desired color for Contact Share
                            // Other options as needed
                        }}
                        className="w-full rounded-lg bg-white dark:bg-black"
                        type="line"
                        height={500}
                        width={'100%'}
                    />
                );
            default:
                return null;
        }
    };


    return (
        <>
            <div className="h-[calc(100vh)] overflow-y-auto px-5 mt-5 ">
                <div className="m-3 flex items-center justify-between">
                    <h2 className="text-2xl font-semibold dark:text-white"> Analytics</h2>
                    <Dropdown options={options} onSelect={handleSelect} offset={[]} placement={''} btnClassName={''} button={''} />
                </div>

                <div className="bg-white  rounded-2xl p-8 z-0 my-5 w-full">
                    {chartVisibility[selectedOption] && (
                        <div>
                            <div className="mb-5 flex items-center justify-between z-30">
                                <h5 className="text-lg font-semibold dark:text-white px-5 mt-5">{selectedOption}</h5>
                            </div>
                            <div className='mr-5'>                            {renderChart()}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
export default analytics;
