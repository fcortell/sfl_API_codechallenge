function getProfitPerNight(sellingRate, margin, nights) {
    return ((sellingRate * margin) / 100) / nights;
}

function getProfit(sellingRate, margin) {
    return (sellingRate * (margin / 100)) ;
}


function avgMinMax(array) {
    var max = 0;
    var min = 0
    var sum = 0;

    array.forEach(function (value) {
        var ppn = getProfitPerNight(value.selling_rate, value.margin, value.nights)
        if (ppn > max)
            max = ppn;
        if (ppn < min || min == 0)
            min = ppn;
        sum += ppn;
    })
    var avg = sum / array.length;

    var result = {
        "avg_night": avg,
        "min_night": min,
        "max_night": max
      }
    return result;

}

function NonOverlappingRanges(ranges) {
    // First we create a sorted array for check in dates and another one for check out dates
    var checkIns = ranges.map(function (r,e) { return {"date":new Date(r.check_in) , "originalIndex": e }}).sort(function (a, b) { return a.date - b.date })
    var checkOuts = ranges.map(function (r) { return addDays(new Date(r.check_in), r.nights) }).sort(function (a, b) { return a - b })
    var indexCheckIn = 0;
    var indexCheckOut = 0;
    var n = ranges.length;
    var active = 0;
    var combined = [];

    while (1) {
        // If element is on array and check in date is previous to check out date
        if (indexCheckIn < n && checkIns[indexCheckIn].date < checkOuts[indexCheckOut]) {
            if (active == 0) {
                combined.push(checkIns[indexCheckIn])
                active++; // Catch semaphore to check next element
            }
            indexCheckIn++;
        } else if (indexCheckOut < n) { // Code arrives here when we already checked indexCheckIn elements overlapings
            if (active == 1) {
                active--; // Release semaphore to check next element
            }
            indexCheckOut++;
        } else break;
    }
    return combined
}

function maximizeProfits(array) {
    // Here we have non overlapping dates
    var nonOverlappingBookings = NonOverlappingRanges(array);
    var separatedProfitsArray = [];
    var nonOverlappingProfitsArray = [];
    var cleanNonOverlappingBookingsArray = []
    // Separated profit calcs
    array.forEach(function (value) {
        separatedProfitsArray.push(getProfit(value.selling_rate, value.margin));
    });

    // Combined profit calcs
    nonOverlappingBookings.forEach(function (nonOverlappingBookings) {
        cleanNonOverlappingBookingsArray.push(array[nonOverlappingBookings.originalIndex]);
        nonOverlappingProfitsArray.push(getProfit(array[nonOverlappingBookings.originalIndex].selling_rate, array[nonOverlappingBookings.originalIndex].margin));
    });

    var nonOverlappingBookingsTotalProfit = nonOverlappingProfitsArray.reduce((a, b) => a + b, 0);

    var maxSeparatedProfits = Math.max(...separatedProfitsArray)
    if(nonOverlappingBookingsTotalProfit > maxSeparatedProfits){

        // Max profit with combination of bookings
        var resultProfits = avgMinMax(cleanNonOverlappingBookingsArray);
        var resultRequestIds = cleanNonOverlappingBookingsArray.map(a => a.request_id);
        var result = {
            "requests_ids": resultRequestIds,
            "total_profit": nonOverlappingBookingsTotalProfit,
            "avg_night": resultProfits.avg_night,
            "min_night": resultProfits.min_night,
            "max_night": resultProfits.max_night

        }

        return result;
    } else {
        // Max profit obtained without combine bookings
        var booking = array[separatedProfitsArray.indexOf(maxSeparatedProfits)]
        var result = {
            "requests_ids": booking.request_id,
            "total_profit": maxSeparatedProfits,
            "avg_night": maxSeparatedProfits,
            "min_night": maxSeparatedProfits,
            "max_night": maxSeparatedProfits
        }

        return result;
    }
}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

module.exports = { avgMinMax, maximizeProfits };
