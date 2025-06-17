import React from 'react';

// Context
import { useAuth } from '../../Context/authContext';

// Custom Components
import SalesDetailsChart from '../../Components/SalesDetailsChart';

// SVGs
import UpIcon from "../../assets/SVGs/DashboardPage/up.svg";
import DownIcon from "../../assets/SVGs/DashboardPage/down.svg";
import UserIcon from "../../assets/SVGs/DashboardPage/user.svg";
import OrderIcon from "../../assets/SVGs/DashboardPage/order.svg";
import SalesIcon from "../../assets/SVGs/DashboardPage/sales.svg";
import PendingIcon from "../../assets/SVGs/DashboardPage/pending.svg";

// Styles
import "../../Styles/Dashboard.css";

const DashBoardPage = () => {

    // Data
    const { email, username, logout } = useAuth();

    // Mock Users Data
    const users_value = 45000
    const todayUsers = 150;
    const yesterdayUsers = 110;

    //  Mock Orders Data
    const orders_value = 12450
    const thisWeekUsers = 540;
    const lastWeekUsers = 470;

    // Mock Sales Data
    const sales_value = 94200;
    const todaySales = 1025;
    const yesterdaySales = 1385;

    // Mock Pending Data
    const pending_value = 145;
    const todayPending = 18;
    const yesterdayPending = 15;

    // Function to calculate daily progress
    function calculateDailyProgress(todayCount, yesterdayCount) {
        const difference = todayCount - yesterdayCount;
        const direction = difference >= 0 ? 'Up' : 'Down';
        const percentage = yesterdayCount === 0
            ? 100
            : Math.abs((difference / yesterdayCount) * 100).toFixed(1);

        return {
            value: difference,
            direction,
            percentage
        };
    }
    // Mock Daily Progress
    const users_progress = calculateDailyProgress(todayUsers, yesterdayUsers);
    const sales_progress = calculateDailyProgress(todaySales, yesterdaySales);
    const pending_progress = calculateDailyProgress(todayPending, yesterdayPending);

    // Function to calculate weekly progress
    function calculateWeeklyProgress(thisWeekCount, lastWeekCount) {
        const difference = thisWeekCount - lastWeekCount;
        const direction = difference >= 0 ? 'Up' : 'Down';
        const percentage = lastWeekCount === 0
            ? 100
            : Math.abs((difference / lastWeekCount) * 100).toFixed(1);

        return {
            value: difference,
            direction,
            percentage
        };
    }
    // Mock Weekly Progress
    const orders_progress = calculateWeeklyProgress(thisWeekUsers, lastWeekUsers);




    // Custom Detail Card 1
    const DetailCard = ({ card_name, card_icon, card_progress_icon, card_value, card_value_progress_text, card_value_progress }) => (
        <div className="dashboardPage-details-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {/* Title, Value, Icon */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                {/* Title & Value */}
                <div>
                    <div className="SB16N90">{card_name}</div>
                    <div className="B28N100" style={{ paddingTop: "0.7rem" }}>
                        {card_value.toLocaleString()}
                    </div>
                </div>
                {/* Icon */}
                <img src={card_icon} alt="UserIcon" className="dashboardPage-details-card-icon" />
            </div>

            {/* Progress - moved to bottom */}
            <div style={{ marginTop: "auto", display: "flex", alignItems: "flex-end", gap: "0.25rem" }}>
                <img src={card_progress_icon} className="dashboardPage-details-card-progressIcon" alt="Progress Icon" />
                <span className={card_value_progress.direction === "Up" ? "SB16Green" : "SB16Red"}>
                    {card_value_progress.percentage}%
                </span>
                <span className='SB16N70'>{card_value_progress.direction === "Up" ? "Up" : "Down"}</span>
                <span className="SB16N70">{card_value_progress_text}</span>
            </div>
        </div>
    );


    return (
        <div style={{
            paddingTop: '1.875rem',
            paddingBottom: '1.25rem',
            paddingLeft: "1.875rem",
            paddingRight: '2.1rem',
            backgroundColor: "var(--Neutral20)",
        }}
        >
            {/* Page Title */}
            <div className='EB32N100'>Dashboard</div>

            {/* Dashboard Details 1 */}
            <div className='dashboardPage-details-card-CONT'>
                {/* Total Users */}
                <DetailCard
                    card_name={"Total Users"}
                    card_icon={UserIcon}
                    card_value={users_value}
                    card_value_progress={users_progress}
                    card_value_progress_text={"from yesterday"}
                    card_progress_icon={users_progress.direction === "Up" ? UpIcon : DownIcon}
                />
                {/* Total Orders */}
                <DetailCard
                    card_name={"Total Orders"}
                    card_icon={OrderIcon}
                    card_value={orders_value}
                    card_value_progress={orders_progress}
                    card_value_progress_text={"from past week"}
                    card_progress_icon={orders_progress.direction === "Up" ? UpIcon : DownIcon}
                />
                {/* Total Sales */}
                <DetailCard
                    card_name={"Total Sales"}
                    card_icon={SalesIcon}
                    card_value={sales_value}
                    card_value_progress={sales_progress}
                    card_value_progress_text={"from yesterday"}
                    card_progress_icon={sales_progress.direction === "Up" ? UpIcon : DownIcon}
                />
                {/* Total Pending */}
                <DetailCard
                    card_name={"Total Pending"}
                    card_icon={PendingIcon}
                    card_value={pending_value}
                    card_value_progress={pending_progress}
                    card_value_progress_text={"from yesterday"}
                    card_progress_icon={pending_progress.direction === "Up" ? UpIcon : DownIcon}
                />
            </div>
            {/* Sales Chart */}
            <SalesDetailsChart />

        </div>
    );
};

export default DashBoardPage;