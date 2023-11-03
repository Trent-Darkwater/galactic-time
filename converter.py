# Constants for day length on Enceladus and Dione in Earth hours
ENCELADUS_DAY = 33  # in Earth hours
DIONE_DAY = 66.7  # in Earth hours

# Function to determine if a year is a leap year
def is_leap_year(year):
    return (year % 4 == 0) and (year % 100 != 0 or year % 400 == 0)

# Function to calculate the total minutes since the start of the year
def calculate_total_minutes(year, month, day, hour, minute):
    MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    total_days = sum(MONTH_DAYS[:month - 1])

    if is_leap_year(year) and month > 2:
        total_days += 1

    total_days += day - 1
    return (total_days * 24 + hour) * 60 + minute

# Function to convert Earth time to Enceladus or Dione time
def convert_to_enceladus_or_dione_time(earth_date, earth_time, destination):
    year, month, day = map(int, earth_date.split('-'))
    hour, minute = map(int, earth_time.split(':'))
    month_names = [None, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    month_name = month_names[month]
    total_earth_minutes_since_year_start = calculate_total_minutes(year, month, day, hour, minute)

    # Precompute the number of minutes in an Enceladus and Dione day
    enceladus_day_length_in_minutes = ENCELADUS_DAY * 60
    dione_day_length_in_minutes = int(DIONE_DAY * 60)

    if destination == "Enceladus":
        day_number = total_earth_minutes_since_year_start // enceladus_day_length_in_minutes
        minutes_past = total_earth_minutes_since_year_start % enceladus_day_length_in_minutes
    elif destination == "Dione":
        day_number = total_earth_minutes_since_year_start // dione_day_length_in_minutes
        minutes_past = total_earth_minutes_since_year_start % dione_day_length_in_minutes

    converted_hour = minutes_past // 60
    converted_minute = minutes_past % 60

    # Time string with zero-padded minutes
    time_str = f"{converted_hour}:{converted_minute:02d}"

    # Generate the output string
    output = f"Local {destination} Earth Time (L{destination[0]}ET):\n"
    output += f"Date: {destination} Day {day_number}, Earth Date: {month_name} {day}, {year}\n"
    output += f"Time: {time_str} {destination[0]}-Time, Earth Time: {hour}:{minute:02d} UTC"

    return output

# Sample usage with the provided date and time:
earth_date = "2182-09-05"
earth_time = "19:32"

# Convert the time for both Enceladus and Dione
result_enceladus = convert_to_enceladus_or_dione_time(earth_date, earth_time, "Enceladus")
result_dione = convert_to_enceladus_or_dione_time(earth_date, earth_time, "Dione")

print(result_enceladus)
print(result_dione)