import React from 'react';

function PasswordStrengthIndicator({ passwordStrength }) {
    let indicatorColor = '';
    let indicatorText = '';

    switch (passwordStrength) {
        case 1:
            indicatorColor = 'bg-red-500';
            indicatorText = 'Weak';
            break;
        case 2:
            indicatorColor = 'bg-yellow-500';
            indicatorText = 'Medium';
            break;
        case 3:
            indicatorColor = 'bg-green-500';
            indicatorText = 'Strong';
            break;
        default:
            break;
    }

    return (
        <div className="flex items-center">
            <div className={`bg-gray-200 h-2 w-full rounded-full mr-4`}>
                <div className={`h-2 rounded-full ${indicatorColor}`} />
            </div>
            <div className="text-sm font-medium text-gray-700">{indicatorText}</div>
        </div>
    );
}

export default PasswordStrengthIndicator;
