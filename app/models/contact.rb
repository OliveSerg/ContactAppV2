class Contact < ActiveRecord::Base
  def formatted_date(date)
    date.strftime("%b %d, %Y")
  end
end
