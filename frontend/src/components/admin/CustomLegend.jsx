import React from 'react';

const CustomLegend = ({ data }) => {
    const { labels, datasets } = data;

    if (!labels || labels.length === 0 || !datasets || datasets.length === 0) {
        return null;
    }

    // 데이터의 라벨과 색상을 매핑하여 범례 아이템 생성
    const legendItems = labels.map((label, index) => {
        const backgroundColor = datasets[0].backgroundColor[index % datasets[0].backgroundColor.length];
        return {
            label,
            backgroundColor
        };
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {legendItems.map((item, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{
                        height: '14px',
                        width: '14px',
                        backgroundColor: item.backgroundColor,
                        marginRight: '10px',
                        display: 'inline-block',
                        borderRadius: '3px'
                    }}></span>
                    {/* 라벨 텍스트 */}
                    <span style={{ fontSize: '14px', color: '#333' }}>{item.label}</span>
                </div>
            ))}
        </div>
    );
};

export default CustomLegend;
