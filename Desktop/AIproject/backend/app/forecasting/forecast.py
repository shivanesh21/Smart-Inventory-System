def moving_average(values):
    if len(values)==0:
        return{
            "message":"No Items Found"
        }
    return sum(values)/len(values)
