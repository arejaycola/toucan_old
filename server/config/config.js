var env = process.env.NODE_ENV || 'development';

if(env === 'development' || env === 'test'){
	process.env.CONSUMER_KEY = "YMWWT7q6Lwb9OZ0ce6RWbcLxe";
	process.env.CONSUMER_SECRET = "A3qQ0HwGr3zXBJn8mODchzfGp6xkT6JRGoXe2dIIlpeGBZiD4N";
	process.env.ACCESS_TOKEN_KEY = "18616681-HT2dhrDgTg7mW39iWrO65mqeUiu1PFgbKZ7tRT3Ig";
	process.env.ACCESS_TOKEN_SECRET = "iwk6zVGvXqjJE69a2mBpa0qNc5LFBcvrzB0emXV9zoSOO";
}