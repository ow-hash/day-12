# AAPL Stock Dashboard

This project is a web-based dashboard designed to display and visualize key financial data and news for Apple Inc. (AAPL) stock. It provides an overview of current stock performance, historical trends, return distributions, and relevant news articles.

## Key Features

*   **Stock Overview Card:** Displays current price, percentage change, volume, 52-week high/low, market cap, and P/E ratio for AAPL.
*   **Combined Price and Volume Chart:** A time-series chart showing daily closing prices (line chart) and trading volume (bar chart) for AAPL.
*   **Daily Returns Histogram:** Visualizes the distribution of daily percentage returns for AAPL stock.
*   **News Carousel:** Presents recent news articles related to AAPL, including titles, sources, dates, images, and summaries.
*   **Financial Highlights:** Shows key financial metrics and insights categorized into profitability, operational efficiency, and shareholder value.
*   **Interactive UI:** Components include hover effects for data cards and image zoom in the news carousel.

## Technologies Used

*   **Next.js:** React framework for server-side rendering and static site generation.
*   **React:** JavaScript library for building user interfaces.
*   **TypeScript:** Superset of JavaScript adding static typing.
*   **Tailwind CSS:** Utility-first CSS framework for styling.
*   **Shadcn UI:** Re-usable UI components (Cards, Carousel, Charts).
*   **Recharts:** A composable charting library for React.
*   **Lucide React:** Icon library.

## Data Source

The application uses a local `data.json` file which contains:
*   Daily historical price and volume data for AAPL.
*   Current stock statistics.
*   A collection of news articles with metadata.
*   Financial insight data.

## Project Structure (Key Components)

*   `src/app/dashboard/chart/page.tsx`: Main dashboard page assembling various components.
*   `src/app/components/`:
    *   `Card.tsx`: Displays current stock statistics.
    *   `Combined.tsx`: Renders the combined price and volume chart.
    *   `Hist.tsx`: Renders the daily returns histogram.
    *   `Carousel.tsx`: Implements the news carousel.
*   `src/components/ui/`: Contains UI primitives like `chart.tsx` (custom chart components based on Recharts and Shadcn UI).
*   `src/data.json`: Static data file for the application.

*   `src/components/ui/`: Contains UI primitives like `chart.tsx` (custom chart components based on Recharts and Shadcn UI).
*   `src/data.json`: Static data file for the application.

## Setup and Installation

To run this project locally, follow these steps:

1.  **Clone the repository (if applicable):**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    Open your terminal in the project root directory and run:
    ```bash
    npm install
    ```
    or if you are using Yarn:
    ```bash
    yarn install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    or if you are using Yarn:
    ```bash
    yarn dev
    ```

4.  **Open your browser:**
    Navigate to `http://localhost:3000` (or the port specified in your terminal) to view the application.

---