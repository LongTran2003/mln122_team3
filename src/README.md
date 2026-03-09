# Marx's Surplus Value Simulator ⚒️

**Lý Thuyết Giá Trị Thặng Dư** - Interactive game simulating Karl Marx's theory of surplus value with authentic Marxian economic calculations.

## 🎮 Game Overview

Experience the fundamental contradictions of capitalism through interactive gameplay based on Marx's *Das Kapital*. Manage three core indicators representing the core dynamics of capitalist production.

### Core Indicators

- **C (Capital)** 🏦 - Productive capital and means of production
- **L (Labor)** 👷 - Labor power and workforce strength  
- **R (Reproduction)** 🏥 - Reproduction of labor power (wages, welfare, living conditions)

**Objective**: Balance these contradictory forces for 30 rounds without system collapse.

## 🎯 Gameplay Mechanics

### Core Loop
1. Each round presents **3 random policies** from 18 total options
2. Choose 1 policy that affects C, L, and R
3. **Special events** trigger at rounds 5, 10, 15, 20, 25
4. Manage contradictions and survive 30 rounds

### Win/Lose Conditions

#### 💀 Lose Conditions (Game Over)
1. **Any indicator reaches 0** → System collapse
   - C = 0: Capital depleted, production stops
   - L = 0: Labor force exhausted, no one to exploit
   - R = 0: Workers cannot reproduce, production impossible

2. **|C - L| > 40** → Class contradiction too extreme
   - When capital and labor diverge too much, system becomes unstable

3. **R < 15 for 3 consecutive rounds** → Workers completely exhausted
   - Sustained low reproduction means labor power cannot be maintained

#### 🏆 Win Condition
- Complete 30 rounds with all indicators above 0 and contradictions manageable

## 🎴 Available Policies (18 total)

### Exploitation Policies (Red)
- **Tăng ca bắt buộc** (Forced overtime): C +8, L -6, R -4
- **Cắt giảm lương** (Wage cut): C +10, L -8, R -5
- **Tăng tốc độ sản xuất** (Speed-up): C +7, L -7, R -3
- **Sa thải hàng loạt** (Mass layoffs): C +12, L -15, R 0

### Investment/Automation Policies (Blue)
- **Đầu tư máy móc** (Machinery): C -8, L -4, R +2
- **Tự động hóa toàn diện** (Full automation): C -15, L -10, R +3
- **Nâng cấp công nghệ** (Tech upgrade): C -10, L 0, R +4
- **Mở rộng nhà máy** (Factory expansion): C -12, L +6, R -2

### Welfare Policies (Green)
- **Tăng lương** (Wage increase): C -6, L +8, R +10
- **Bảo hiểm y tế** (Healthcare): C -5, L +4, R +12
- **An toàn lao động** (Workplace safety): C -4, L +3, R +8
- **Đào tạo nghề** (Training): C -7, L +6, R +9
- **Trợ cấp con nhỏ** (Childcare subsidy): C -4, L +2, R +11

### Balanced Policies (Purple)
- **Tuyển thêm công nhân** (Hire workers): C -5, L +10, R -3
- **Gia công thuê ngoài** (Outsource): C +4, L -5, R +2
- **Thưởng hiệu suất** (Performance bonus): C -3, L +5, R +6
- **Giảm giờ làm** (Reduce hours): C -4, L +6, R +7
- **Chia sẻ lợi nhuận** (Profit sharing): C -8, L +7, R +10

## ⚡ Special Events

Events trigger at specific rounds (5, 10, 15, 20, 25) with major impacts:

### Round 5
- Đình công tự phát (Wildcat strike)
- Luật lao động mới (New labor laws)

### Round 10
- Cách mạng công nghiệp 4.0 (Industry 4.0 revolution)
- Khủng hoảng kinh tế (Economic crisis)

### Round 15
- Tăng lương tối thiểu (Minimum wage increase)
- Thành lập công đoàn (Union formation)

### Round 20
- Bùng nổ AI và Robot (AI/Robot boom)
- Thanh tra lao động đột xuất (Labor inspection)

### Round 25
- Phong trào công nhân toàn cầu (Global labor movement)
- Tư nhân hóa hoàn toàn (Full privatization)

## 📊 Marxian Economic Calculations

At game end, the system calculates authentic Marxian metrics:

### Core Metrics

**1. Labor-time (Thời gian lao động)**
- Total labor hours worked throughout the game
- Formula: `Σ L across all rounds`

**2. Necessary Labor (Lao động cần thiết)**
- Labor required to reproduce labor power (wages, welfare)
- Formula: `Labor-time × (R / 100)`
- Represents value returned to workers

**3. Surplus Labor (Lao động thặng dư)**
- Labor beyond what's necessary
- Formula: `Labor-time - Necessary Labor`
- Source of capitalist profit

**4. Surplus Value (M')**
- Value created by surplus labor
- Formula: `Surplus Labor × (C / 50)`
- The core of Marxian exploitation theory

**5. Rate of Exploitation (M'/Ln)**
- **The key metric in Marx's theory**
- Formula: `Surplus Labor / Necessary Labor`
- Direct measure of exploitation intensity

## 🏅 Ranking System

Ranked based on Rate of Exploitation (M'/Ln):

| Rank | Exploitation Rate | Description | Meaning |
|------|------------------|-------------|---------|
| **S** | < 0.5 | Chủ nghĩa xã hội lý tưởng | Socialist ideal - minimal exploitation |
| **A** | 0.5-1.0 | Tư bản có lương tâm | Conscientious capitalism - high welfare |
| **B** | 1.0-1.5 | Tư bản điều tiết | Regulated capitalism - balanced |
| **C** | 1.5-2.5 | Tư bản chuẩn mực | Standard capitalism - moderate exploitation |
| **D** | 2.5-4.0 | Tư bản bóc lột | Exploitative capitalism - high class conflict |
| **F** | > 4.0 or Failed | Tư bản dã man | Savage capitalism - system collapse |

Each rank is accompanied by a quote from:
- Karl Marx
- Friedrich Engels  
- Rosa Luxemburg
- Antonio Gramsci
- V.I. Lenin

## 🎨 UI/UX Features

### Layout (inspired by boi.hengout.app)
- **Left Sidebar**: 3 indicator bars (C, L, R) + contradiction meter + warnings
- **Center Panel**: 3 policy cards with color-coded categories
- **Right Sidebar**: Event log tracking all actions and events
- **Header**: Round counter (X/30)

### Visual Design
- Pastel gradients (red, orange, rose)
- Color-coded policy categories
- Real-time warnings for dangerous conditions
- Smooth animations and transitions
- Fully responsive (desktop & mobile)

### Warning System
- Visual pulse when indicators < 15
- Contradiction meter shows |C-L| in real-time
- Consecutive low-R counter (tracks 3-round rule)
- Critical alerts in event log

## 📁 Project Structure

```
/
├── App.tsx                          # Main app with screen routing
├── components/
│   ├── MenuScreen.tsx              # Start menu with rules
│   ├── GameScreen.tsx              # Main game loop & logic
│   ├── ResultScreen.tsx            # End screen with Marx metrics
│   ├── IndicatorBar.tsx            # C/L/R status bars
│   ├── PolicyCard.tsx              # Policy selection cards
│   ├── GameLog.tsx                 # Event log sidebar
│   └── SpecialEventModal.tsx       # Special event popup
├── data/
│   ├── policies.ts                 # 18 policy definitions
│   ├── special-events.ts           # 10 special events
│   └── quotes.ts                   # 15 Marxist quotes
└── README.md                       # This file
```

## 🎓 Educational Value

This game teaches core concepts from Marx's *Das Kapital*:

### Key Concepts Illustrated

1. **Surplus Value Theory**
   - Workers create value beyond their wages
   - This surplus is the source of profit
   - Illustrated through M' = Surplus Labor × Capital intensity

2. **Exploitation Rate (M'/Ln)**
   - Central to Marx's critique of capitalism
   - Shows ratio of unpaid labor to paid labor
   - Higher rate = more intense exploitation

3. **Capital-Labor Contradiction**
   - Inherent conflict between C and L
   - System fails when contradiction becomes too extreme (|C-L| > 40)
   - Reflects real class struggle

4. **Reproduction of Labor Power (R)**
   - Workers need wages/welfare to survive and work
   - R < 15 for 3 rounds = workers can't continue
   - Represents minimum subsistence threshold

5. **Forms of Surplus Value Extraction**
   - **Absolute surplus value**: Extending work hours, speed-ups (exploitation policies)
   - **Relative surplus value**: Technology and automation (investment policies)

6. **Crisis and Collapse**
   - System has internal contradictions
   - Multiple failure modes reflect real economic crises
   - No guaranteed stable equilibrium

## 🔧 Technical Details

### Game Logic

**Contradiction Tracking**
```typescript
const contradiction = Math.abs(C - L);
if (contradiction > 40) {
  // Game Over: Class conflict too extreme
}
```

**Reproduction Crisis**
```typescript
if (R < 15) {
  lowRCount++;
  if (lowRCount >= 3) {
    // Game Over: Workers exhausted
  }
} else {
  lowRCount = 0; // Reset
}
```

**Surplus Calculation**
```typescript
const laborTime = Σ L;
const necessaryLabor = laborTime × (R / 100);
const surplusLabor = laborTime - necessaryLabor;
const surplusValue = surplusLabor × (C / 50);
const exploitationRate = surplusLabor / necessaryLabor;
```

### Stack
- **Framework**: React + TypeScript
- **Styling**: Tailwind CSS v4.0
- **Icons**: Emoji (no external dependencies)
- **Build**: Vite
- **No backend required** - Pure frontend logic

## 🚀 How to Play

1. **Start**: Read the rules on the menu screen
2. **Each Round**:
   - View your C, L, R indicators
   - Check contradiction meter and warnings
   - Choose 1 of 3 random policies
   - Watch the effects apply
3. **Special Events**: React to major events at rounds 5, 10, 15, 20, 25
4. **Monitor**: Watch for lose conditions
5. **Survive**: Reach round 30 to win
6. **Results**: See your Marxian metrics and rank

## 💡 Strategy Tips

1. **Balance is crucial**: Don't let any indicator drop too low
2. **Watch the contradiction**: Keep |C-L| under control
3. **R is critical**: Don't let R stay below 15 for too long
4. **Plan for events**: Save buffer for rounds 5, 10, 15, 20, 25
5. **Category diversity**: Mix exploitation, investment, and welfare policies
6. **Think long-term**: Short-term gains can lead to collapse

## 📖 Theoretical Background

### Marx's Formula: M' = S / V

Where:
- **M'** = Rate of surplus value (exploitation rate)
- **S** = Surplus value (unpaid labor)
- **V** = Variable capital (wages)

In our game:
- **S** = Surplus Labor (total labor - necessary labor)
- **V** = Necessary Labor (labor needed for reproduction)
- **M'/Ln** = S/V = Exploitation Rate

### The Circuit of Capital: M - C - M'

Marx describes capitalism as money (M) invested in commodities (C - means of production + labor) to create more money (M'). The difference M' - M is surplus value, extracted from unpaid labor.

Our game simulates this circuit:
- **C** (Capital) = Means of production
- **L** (Labor) = Labor power purchased
- **R** (Reproduction) = Cost of maintaining labor
- **M'** (Surplus) = The additional value extracted

## 🎯 Learning Outcomes

After playing, you will understand:

1. ✅ What surplus value means in concrete terms
2. ✅ How exploitation rate is calculated (M'/Ln)
3. ✅ The contradiction between capital and labor
4. ✅ Why workers need welfare to maintain productivity
5. ✅ How capitalism has inherent crisis tendencies
6. ✅ The difference between absolute and relative surplus value
7. ✅ Why Marx believed capitalism was fundamentally unstable

## 📚 Further Reading

- **Das Kapital Vol. 1** - Karl Marx (Chapter 7-10 on surplus value)
- **Wage Labour and Capital** - Karl Marx
- **Value, Price and Profit** - Karl Marx
- **The Accumulation of Capital** - Rosa Luxemburg
- **Imperialism, the Highest Stage of Capitalism** - V.I. Lenin

## 🙏 Credits

**Game Design**: Educational simulation of Marxist economics  
**Inspired by**: boi.hengout.app gameplay mechanics  
**Theory**: Karl Marx, Friedrich Engels, Rosa Luxemburg, Antonio Gramsci  
**Built with**: React, TypeScript, Tailwind CSS

---

*"Workers of the world, unite! You have nothing to lose but your chains!"* - Karl Marx & Friedrich Engels, The Communist Manifesto

**Note**: This is an educational tool for understanding Marxist economic theory. It simplifies complex concepts for interactive learning.
