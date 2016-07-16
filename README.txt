README

Guide "How not to crush your project"

CASE 1:
You're working on your local branch 'my_branch'.
You want to commit your changes to your remote branch 'origin->my_branch'.
Do fetch, merge (review all conflicts carefully!), then commit with message and push.
Check your remote branch by doing fetch and merge again.
Of course, if you're sure that no one else touched your remote branch after you, you can just commit and push your changes, cause you'll have nothing to merge in that case.
CASE 2:
You're working on your local branch 'my_branch'. You want to commit your changes to your remote branch 'origin->develop'. You need to make a pull request. Do fetch, merge with 'origin->develop' (review all conflicts carefully!), then commit to your remote branch 'origin->my_branch' (!!!). Check workability. Then go to your github page from browser, go to your branch from there and click 'new pull request'. Describe your pull request with message, then pick 'develop' branch as a base and 'my_branch' as a comparable. Check all conflicts by scrolling down VERY CAREFULLY, when you're sure that all is good, click 'make pull request' (Sanya will look at it later and review all changes again). After pull request was closed, checkout your local 'my_branch' in WebStorm, then do merge with 'origin->develop' and check the workability. Then you can continue working on your branch.

And please don't push anything on someone other's branch without his permission!

Hope this will help you to prevent possible mistakes while commiting and merging :)
