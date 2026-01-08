// Financial data for all companies
const financialData = {
    LMFA: { marketCap: 7, revenue: 8, ebitda: null, netIncome: -7 },
    BTBT: { marketCap: 715, revenue: 106, ebitda: 162, netIncome: 137 },
    HIVE: { marketCap: 709, revenue: 193, ebitda: 106, netIncome: 34 },
    DMG: { marketCap: 40, revenue: 34, ebitda: 6, netIncome: -7 },
    PHX: { marketCap: 1645, revenue: 142, ebitda: 197, netIncome: -232 }
};

// Compensation data for all companies
const compensationData = {
    LMFA: {
        name: "LMFA",
        fullName: "LM Funding America, Inc.",
        currency: "USD",
        years: {
            2024: {
                executives: [
                    {
                        name: "Bruce Rodgers",
                        role: "Chairman, CEO & President",
                        salary: 825000,
                        cashBonus: 473750,
                        allOtherComp: 26561,
                        reportedTotal: 1305311,
                        notes: "All other comp includes insurance premiums."
                    },
                    {
                        name: "Richard Russell",
                        role: "Chief Financial Officer",
                        salary: 550000,
                        cashBonus: 275000,
                        allOtherComp: 53238,
                        reportedTotal: 878238
                    }
                ]
            },
            2023: {
                executives: [
                    {
                        name: "Bruce Rodgers",
                        role: "Chairman, CEO & President",
                        salary: 825000,
                        cashBonus: 0,
                        stockAwardsValue: 488345,
                        optionAwardsValue: 356503,
                        allOtherComp: 24860,
                        reportedTotal: 1694708
                    },
                    {
                        name: "Richard Russell",
                        role: "Chief Financial Officer",
                        salary: 550000,
                        cashBonus: 0,
                        stockAwardsValue: 488345,
                        optionAwardsValue: 356503,
                        allOtherComp: 48467,
                        reportedTotal: 1443315
                    }
                ]
            }
        }
    },
    BTBT: {
        name: "BTBT",
        fullName: "Bit Digital, Inc.",
        currency: "USD",
        years: {
            2024: {
                executives: [
                    {
                        name: "Sam Tabar",
                        role: "CEO",
                        salary: 500000,
                        cashBonus: 1100000,
                        stockAwardsValue: 3222650,
                        stockAwardsUnits: 945000,
                        allOtherComp: 0,
                        reportedTotal: 4822650
                    },
                    {
                        name: "Erke Huang",
                        role: "CFO & Director",
                        salary: 597963,
                        cashBonus: 1100000,
                        stockAwardsValue: 3523650,
                        stockAwardsUnits: 1045000,
                        allOtherComp: 0,
                        reportedTotal: 5221613
                    },
                    {
                        name: "Bryan Bullett",
                        role: "Previously CEO",
                        salary: 312000,
                        cashBonus: 0,
                        stockAwardsValue: 505500,
                        stockAwardsUnits: 150000,
                        allOtherComp: 0,
                        reportedTotal: 817500
                    }
                ]
            },
            2023: {
                executives: [
                    {
                        name: "Sam Tabar",
                        role: "CEO",
                        salary: 500000,
                        cashBonus: 0,
                        stockAwardsValue: 1239500,
                        stockAwardsUnits: 300000,
                        allOtherComp: 0,
                        reportedTotal: 1739500
                    },
                    {
                        name: "Erke Huang",
                        role: "CFO & Director",
                        salary: 499459,
                        cashBonus: 200000,
                        stockAwardsValue: 2837000,
                        stockAwardsUnits: 750000,
                        allOtherComp: 0,
                        reportedTotal: 3536459
                    },
                    {
                        name: "Bryan Bullett",
                        role: "Previously CEO",
                        salary: 1125000,
                        cashBonus: 0,
                        stockAwardsValue: 0,
                        allOtherComp: 0,
                        reportedTotal: 1125000
                    }
                ]
            }
        }
    },
    HIVE: {
        name: "HIVE",
        fullName: "HIVE Digital Technologies",
        currency: "CAD",
        years: {
            2024: {
                executives: [
                    {
                        name: "Aydin Kilic",
                        role: "President & CEO",
                        salary: 0,
                        annualIncentive: 162400,
                        stockAwardsValue: 859564,
                        optionAwardsValue: 447950,
                        allOtherComp: 312000,
                        reportedTotal: 1781914
                    },
                    {
                        name: "Darcy Daubaras",
                        role: "CFO",
                        salary: 312000,
                        annualIncentive: 183600,
                        optionAwardsValue: 447950,
                        allOtherComp: 101256,
                        reportedTotal: 1044806
                    },
                    {
                        name: "Frank Holmes",
                        role: "Executive Chairman",
                        salary: 0,
                        optionAwardsValue: 119453,
                        allOtherComp: 217000,
                        reportedTotal: 336453
                    }
                ]
            },
            2023: {
                executives: [
                    {
                        name: "Aydin Kilic",
                        role: "President & CEO",
                        salary: 0,
                        annualIncentive: 126600,
                        stockAwardsValue: 452160,
                        optionAwardsValue: 353529,
                        allOtherComp: 312000,
                        reportedTotal: 1244289
                    },
                    {
                        name: "Darcy Daubaras",
                        role: "CFO",
                        salary: 311000,
                        annualIncentive: 76600,
                        stockAwardsValue: 594000,
                        allOtherComp: 99374,
                        reportedTotal: 1080974
                    },
                    {
                        name: "Frank Holmes",
                        role: "Executive Chairman",
                        salary: 0,
                        stockAwardsValue: 6876000,
                        allOtherComp: 225921,
                        reportedTotal: 7101921
                    }
                ]
            }
        }
    },
    DMG: {
        name: "DMG",
        fullName: "DMG Blockchain Solutions",
        currency: "CAD",
        years: {
            2024: {
                executives: [
                    {
                        name: "Sheldon Bennett",
                        role: "CEO & Director",
                        salary: 387936,
                        cashBonus: 617100,
                        reportedTotal: 1005036
                    },
                    {
                        name: "Heather Sim",
                        role: "CFO & Director",
                        salary: 42000,
                        allOtherComp: 2000,
                        reportedTotal: 44000,
                        notes: "Committee fees included."
                    }
                ]
            },
            2023: {
                executives: [
                    {
                        name: "Sheldon Bennett",
                        role: "CEO & Director",
                        salary: 338552,
                        cashBonus: 440000,
                        reportedTotal: 778552
                    },
                    {
                        name: "Heather Sim",
                        role: "CFO & Director",
                        salary: 18200,
                        reportedTotal: 18200
                    }
                ]
            }
        }
    },
    PHX: {
        name: "PHX",
        fullName: "Phoenix Group PLC",
        currency: "USD",
        executiveCount: 5,
        years: {
            2024: {
                executives: [
                    {
                        name: "Key Management Personnel",
                        role: "Total (Detail not disclosed)",
                        reportedTotal: 3750000,
                        notes: "Aggregate compensation for key management personnel."
                    }
                ],
                additionalInfo: "30,000 AED per board meeting fee (per meeting)"
            },
            2023: {
                executives: [
                    {
                        name: "Key Management Personnel",
                        role: "Aggregate",
                        reportedTotal: 2201000,
                        notes: "Aggregate compensation for key management personnel."
                    }
                ]
            }
        }
    }
};

// Utility functions
function formatCurrency(amount, currency) {
    if (amount === undefined || amount === null) return '-';
    const prefix = currency === 'CAD' ? 'C$' : '$';
    return prefix + amount.toLocaleString('en-US');
}

function getInitials(name) {
    return name.split(' ').map(word => word[0]).join('').substring(0, 2);
}

function getTotalComp(company, year) {
    const data = compensationData[company].years[year];
    return data ? data.executives.reduce((sum, exec) => sum + (exec.reportedTotal || 0), 0) : 0;
}

function getLatestYear(company) {
    return Math.max(...Object.keys(compensationData[company].years).map(Number));
}

// Render company list
function renderCompanyList(searchTerm = '') {
    const companyList = document.getElementById('companyList');
    const companies = ['LMFA', 'BTBT', 'HIVE', 'DMG', 'PHX'];

    const filteredCompanies = companies.filter(ticker => {
        const data = compensationData[ticker];
        const searchLower = searchTerm.toLowerCase();
        return ticker.toLowerCase().includes(searchLower) ||
               data.fullName.toLowerCase().includes(searchLower);
    });

    if (filteredCompanies.length === 0) {
        companyList.innerHTML = '<div class="no-results">No companies found</div>';
        return;
    }

    companyList.innerHTML = filteredCompanies.map(ticker => {
        const compData = compensationData[ticker];
        const finData = financialData[ticker];
        const latestYear = getLatestYear(ticker);
        const totalComp = getTotalComp(ticker, latestYear);

        return `
            <div class="company-item" data-ticker="${ticker}">
                <div class="company-header">
                    <div class="company-name">${compData.fullName}</div>
                    <div class="company-ticker">${ticker}</div>
                </div>
                <div class="company-stats">
                    <div class="stat">
                        <span class="stat-label">Market Cap</span>
                        <div class="stat-value">${finData.marketCap ? '$' + finData.marketCap + 'M' : '-'}</div>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Revenue</span>
                        <div class="stat-value">$${finData.revenue}M</div>
                    </div>
                </div>
                <div class="total-comp">FY${latestYear}: ${formatCurrency(totalComp, compData.currency)}</div>
            </div>
        `;
    }).join('');

    // Add click handlers
    document.querySelectorAll('.company-item').forEach(item => {
        item.addEventListener('click', () => {
            const ticker = item.dataset.ticker;
            showCompanyDetail(ticker);
        });
    });
}

// Show company detail view
function showCompanyDetail(ticker) {
    const compData = compensationData[ticker];
    const finData = financialData[ticker];
    const latestYear = getLatestYear(ticker);
    const yearData = compData.years[latestYear];

    document.getElementById('listView').style.display = 'none';
    document.getElementById('detailView').classList.add('active');
    document.getElementById('detailTitle').textContent = `${ticker} - ${compData.fullName}`;

    const totalComp = yearData.executives.reduce((sum, exec) => sum + (exec.reportedTotal || 0), 0);
    const execCount = compData.executiveCount || yearData.executives.length;
    const avgComp = Math.round(totalComp / execCount);

    let detailHTML = `
        <div class="financials">
            <div class="financials-title">Financial Overview (USD mm)</div>
            <div class="financial-grid">
                <div class="financial-stat">
                    <div class="value">${finData.marketCap ? '$' + finData.marketCap + 'M' : '-'}</div>
                    <div class="label">Market Cap</div>
                </div>
                <div class="financial-stat">
                    <div class="value">$${finData.revenue}M</div>
                    <div class="label">Revenue</div>
                </div>
                <div class="financial-stat">
                    <div class="value">${finData.ebitda !== null ? '$' + finData.ebitda + 'M' : '-'}</div>
                    <div class="label">EBITDA</div>
                </div>
                <div class="financial-stat">
                    <div class="value ${finData.netIncome < 0 ? 'negative' : ''}">
                        ${finData.netIncome < 0 ? '($' + Math.abs(finData.netIncome) + 'M)' : '$' + finData.netIncome + 'M'}
                    </div>
                    <div class="label">Net Income</div>
                </div>
            </div>
        </div>

        <div class="financials">
            <div class="financials-title">Compensation Summary (FY${latestYear})</div>
            <div class="financial-grid">
                <div class="financial-stat">
                    <div class="value">${formatCurrency(totalComp, compData.currency)}</div>
                    <div class="label">Total Comp</div>
                </div>
                <div class="financial-stat">
                    <div class="value">${formatCurrency(avgComp, compData.currency)}</div>
                    <div class="label">Avg per Exec</div>
                </div>
            </div>
        </div>

        <div class="executives-section">
            <div class="section-title">Executives (FY${latestYear})</div>
            ${yearData.executives.map(exec => renderExecutiveCard(exec, compData.currency)).join('')}
        </div>
    `;

    document.getElementById('detailContent').innerHTML = detailHTML;
}

// Render executive card
function renderExecutiveCard(exec, currency) {
    const items = [];
    if (exec.salary) items.push({ label: 'Base Salary', value: exec.salary });
    if (exec.cashBonus) items.push({ label: 'Cash Bonus', value: exec.cashBonus });
    if (exec.annualIncentive) items.push({ label: 'Annual Incentive', value: exec.annualIncentive });
    if (exec.stockAwardsValue) items.push({ label: 'Stock Awards', value: exec.stockAwardsValue });
    if (exec.optionAwardsValue) items.push({ label: 'Option Awards', value: exec.optionAwardsValue });
    if (exec.allOtherComp) items.push({ label: 'Other Comp', value: exec.allOtherComp });

    return `
        <div class="executive-card">
            <div class="exec-header">
                <div class="exec-avatar">${getInitials(exec.name)}</div>
                <div class="exec-info">
                    <h4>${exec.name}</h4>
                    <div class="role">${exec.role}</div>
                </div>
            </div>
            <div class="comp-items">
                ${items.map(item => `
                    <div class="comp-row">
                        <span class="label">${item.label}</span>
                        <span class="value">${formatCurrency(item.value, currency)}</span>
                    </div>
                `).join('')}
                <div class="comp-row total">
                    <span class="label">Total</span>
                    <span class="value">${formatCurrency(exec.reportedTotal, currency)}</span>
                </div>
            </div>
        </div>
    `;
}

// Back button handler
document.getElementById('backBtn').addEventListener('click', () => {
    document.getElementById('detailView').classList.remove('active');
    document.getElementById('listView').style.display = 'block';
});

// Search functionality
document.getElementById('searchInput').addEventListener('input', (e) => {
    renderCompanyList(e.target.value);
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderCompanyList();
});
